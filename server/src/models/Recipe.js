const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    recipeId: { type: String, required: true, unique: true }, 
    title: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: [{ type: String }], 
    instructions: { type: String },
    nutrition: { type: Object },
    savedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
