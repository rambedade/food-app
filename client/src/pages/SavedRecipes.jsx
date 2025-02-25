import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config";


function SavedRecipes() {
  const { user } = useContext(AuthContext);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track API errors

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user) return; // If user is not logged in, do nothing

      try {
        const response = await axios.get(`${BASE_URL}/api/recipes/saved`, {
          withCredentials: true,
        });

        console.log("API Response:", response.data); // ✅ Debugging line

        if (response.data.length === 0) {
          setError("No saved recipes found."); // Show message if empty
        }
        
        setSavedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
        setError("Failed to load saved recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-gray-600">
          Please <Link to="/login" className="text-blue-600 underline">login</Link> to view saved recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Saved Recipes</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading saved recipes...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedRecipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden w-72">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{recipe.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipes;
