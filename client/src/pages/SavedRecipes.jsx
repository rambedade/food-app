import { useEffect, useState } from "react";
import axios from "axios";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes/saved", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSavedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    if (token) {
      fetchSavedRecipes();
    }
  }, [token]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedRecipes.map(recipe => (
            <div key={recipe._id} className="border p-4 rounded">
              <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-md" />
              <h2 className="text-lg font-bold mt-2">{recipe.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipes;
