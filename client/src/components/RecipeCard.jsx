import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaRegHeart, FaHeart } from "react-icons/fa"; 
import { BASE_URL } from "../config";


function RecipeCard({ recipe }) {
  const { user } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);

  const handleSaveRecipe = async () => {
    if (!user) {
      alert("Please login to save recipes!");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/recipes/save`, {
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image,
      }, { withCredentials: true });

      setSaved(true);
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 h-96 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />

      <div className="p-4 flex-grow flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{recipe.title}</h2>

        <div className="flex gap-2 mt-3">
          <Link 
            to={`/recipe/${recipe.id}`} 
            className="text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex-1"
          >
            View Recipe →
          </Link>

          <button
            onClick={handleSaveRecipe}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${saved ? "bg-gray-400 text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}
          >
            {saved ? <FaHeart /> : <FaRegHeart />} {/* Toggle heart icon */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
