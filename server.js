const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({});
require("dotenv").config();
const connectDB = require("./db/connectDB");
connectDB();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./utils/auth");
const Book = require("./models/users");
const User = require("./models/users");

const Note = require("./models/Note");

const PORT = 3006;
// middleware
app.use(express.json());



//routes enpoints

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        // if no user, create user

        const newUser = new User({
            username,
            email,
            password,
        });
        await newUser.save();
        // created user, sending response

        res.status(201).json({
            message: "User Saved Successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log("Full ERROR:");
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message

        });
    }
});

// route/endpoint login

app.post("/api/users/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password"
            });
        }

        //Comparing password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect email or password"
            });
        }

        // Creating JWT payload
        const payload = {
            _id: user._id,
            username: user.username
        };

        // Sign token
        const token = jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Sending response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});
// Adding authMiddleware 

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password"); //The minus sign means exclude.
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }

});

// Create note route
router.post("/", async (req, res) => {
    const note = await Note.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user._id
    });

})
// get all the nodes
router.get("/", authMiddleware, async (req, res) => {

    const notes = await Note.find({
        user: req.user._id
    });

    res.json(notes);
});
// update Note to check ownership

router.put("/:id", authMiddleware, async (req, res) => {

    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    // ownership check
    if (note.user.toString() !== req.user._id) {
        return res.status(403).json({
            message: "User is not authorized to update this note"
        });
    }

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedNote);
});

// detele note with ownership check

router.delete("/:id", authMiddleware, async (req, res) => {

    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id) {
        return res.status(403).json({
            message: "User is not authorized to delete this note"
        });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({ message: "Note deleted successfully" });
});

// getting single note

router.get("/:id", authMiddleware, async (req, res) => {

    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id) {
        return res.status(403).json({
            message: "User is not authorized to view this note"
        });
    }

    res.json(note);
});


//connects router to the Express app AND sets a base URL ("/api/users" (prefix)) for all routes inside that router.
app.use("/api/users", router)
//port

app.listen(PORT, () => {
    console.log('Server running on port')
})