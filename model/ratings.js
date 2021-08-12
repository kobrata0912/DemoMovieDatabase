const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema({
  user_id: { type: String, unique: true},
  movies: { type: Array, default: [] },
}, {collection: "userRatings"});

module.exports = mongoose.model("ratings", ratingsSchema);