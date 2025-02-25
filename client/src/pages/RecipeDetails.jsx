import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/recipes/details/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Failed to load recipe. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading)
    return <p className="text-blue-500 text-center text-lg font-semibold">Loading recipe details...</p>;
  if (error)
    return <p className="text-red-500 text-center text-lg font-semibold">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mt-5 mx-auto bg-white shadow-lg rounded-lg">
      {/* Recipe Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-900">{recipe.title}</h1>

      {/* Recipe Image */}
      <div className="flex justify-center">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 rounded-lg shadow-md mt-4"
        />
      </div>

      {/* Ingredients Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
          Ingredients
        </h2>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-lg text-gray-700">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id} className="flex items-center gap-2">
              ✅ {ingredient.original}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
          Instructions
        </h2>
        <p
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          className="mt-3 text-lg text-gray-700 leading-relaxed"
        />
      </div>
    </div>
  );
}

export default RecipeDetails;
