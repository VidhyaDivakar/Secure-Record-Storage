const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const { authMiddleware } = require("../utils/auth");

// create notes
router.post("/", authMiddleware, async (req, res) => {
    try {

        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            user: req.user._id
        });

        res.status(201).json(note);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

//get all notes

router.get("/", authMiddleware, async (req, res) => {
    try {

        const notes = await Note.find({
            user: req.user._id
        });

        res.json(notes);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// get single note
router.get("/:id", authMiddleware, async (req, res) => {
    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.user.toString() !== req.user._id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.json(note);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// update note
router.put("/:id", authMiddleware, async (req, res) => {
    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.user.toString() !== req.user._id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedNote);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

//delete note
router.delete("/:id", authMiddleware, async (req, res) => {
    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.user.toString() !== req.user._id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json({ message: "Note deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
module.exports = router;
