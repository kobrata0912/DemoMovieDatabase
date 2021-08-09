const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user_id: { type: String, unique: true},
  movies_ids: { type: Array, default: [] },
}, {collection: "userFavorites"});

module.exports = mongoose.model("favorite", favoriteSchema);