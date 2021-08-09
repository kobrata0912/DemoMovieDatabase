const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    movie_id: { type: String, unique: true, default: null},
    movie_note: { type: String, default: null},
})

const notesSchema = new mongoose.Schema({
  user_id: { type: String, unique: true},
  movies: [{ type: noteSchema, default: [] }],
}, {collection: "userNotes"});

module.exports = mongoose.model("notes", notesSchema);