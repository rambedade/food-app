import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
  console.log("Recipes received in RecipeList:", recipes);  

  if (!recipes || recipes.length === 0) {
    return <p>No recipes found. Try a different search.</p>;
  }

  return (
    <div className="grid grid-cols-1 ml-16 md:grid-cols-3 mt-9 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
