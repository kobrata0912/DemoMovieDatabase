const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    movie_id: { type: String, unique: true},
    movie_rating: { type: String, default: null},
})

const ratingsSchema = new mongoose.Schema({
  user_id: { type: String, unique: true},
  movies: [{ type: ratingSchema, default: [] }],
}, {collection: "userRatings"});

module.exports = mongoose.model("ratings", ratingsSchema);