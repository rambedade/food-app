import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/details/${id}`);
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

  if (loading) return <p className="text-blue-500">Loading recipe details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full max-w-md my-4 rounded-md" />
      <h2 className="text-xl font-semibold">Ingredients</h2>
      <ul className="list-disc pl-6">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Instructions</h2>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} className="mt-2" />
    </div>
  );
}

export default RecipeDetails;
