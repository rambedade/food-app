const express = require("express");
const axios = require("axios");
const Recipe = require("../models/Recipe");
const User = require("../models/User"); // ✅ Import User model
const authMiddleware = require("../middleware/auth"); // ✅ Import Auth Middleware

const router = express.Router();

// ✅ Recipe Search API
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: { query, number: 10, apiKey: process.env.SPOONACULAR_API_KEY },
        });

        if (!response.data || !response.data.results) {
            return res.status(500).json({ message: "No recipes found from API" });
        }

        res.json(response.data.results);
    } catch (err) {
        console.error("Error fetching recipes:", err.message);
        res.status(500).json({ message: "Error fetching recipes", error: err.message });
    }
});

// ✅ Fetch Recipe Details
router.get("/details/:id", async (req, res) => {
    try {
        const recipeId = req.params.id;
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
            params: { apiKey: process.env.SPOONACULAR_API_KEY },
        });

        res.json(response.data);
    } catch (err) {
        console.error("Error fetching recipe details:", err.message);
        res.status(500).json({ message: "Error fetching recipe details", error: err.message });
    }
});

// ✅ Save Recipe to Favorites (Requires Authentication)
router.post("/save", authMiddleware, async (req, res) => {
    try {
        const { recipeId, title, image } = req.body;
        const userId = req.user.id;

        if (!recipeId || !title || !image) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if recipe already exists in the database
        let recipe = await Recipe.findOne({ recipeId });
        if (!recipe) {
            recipe = new Recipe({ recipeId, title, image });
            await recipe.save();
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent duplicate saves
        if (user.savedRecipes.includes(recipe._id)) {
            return res.status(400).json({ message: "Recipe already saved" });
        }

        user.savedRecipes.push(recipe._id);
        await user.save();

        res.json({ message: "Recipe saved successfully!" });
    } catch (error) {
        console.error("Error saving recipe:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// ✅ Get Saved Recipes (Requires Authentication)
router.get("/saved", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("savedRecipes");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.savedRecipes);
    } catch (error) {
        console.error("Error fetching saved recipes:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
