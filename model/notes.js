const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  user_id: { type: String, unique: true},
  movies: { type: Array, default: [] },
}, {collection: "userNotes"});

module.exports = mongoose.model("notes", notesSchema);