#### Secure Record Storage


This project implements a secure Notes API using Node.js, Express, and MongoDB with Mongoose, focusing on user-based data ownership and authorization. A `user` field is added to the Note schema as a required reference to the User model using `Schema.Types.ObjectId`, ensuring each note is linked to its creator. During note creation (POST `/api/notes`), the authenticated user’s ID from `req.user` is stored in the note to establish ownership.

The GET `/api/notes` endpoint is modified to return only notes belonging to the logged-in user by filtering with `user: req.user._id`. Update (PUT `/api/notes/:id`) and delete (DELETE `/api/notes/:id`) operations include strict ownership checks by comparing the note’s `user` field with the authenticated user ID. If the user is not the owner, the API returns a 403 Forbidden response.

This ensures secure CRUD operations with proper authentication and authorization enforcement at the API level.
