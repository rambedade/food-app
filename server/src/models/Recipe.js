const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    recipeId: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: [{ type: String }],
    instructions: { type: String },
    nutrition: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model("Recipe", RecipeSchema);
