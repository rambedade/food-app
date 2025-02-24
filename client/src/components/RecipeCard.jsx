import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white w-75 rounded-lg shadow-md overflow-hidden w-100 h-85 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl duration-300 border border-gray-200">
      {/* Image Section */}
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-52 object-cover rounded-t-lg"
      />

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col  bg-white-100 justify-between">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 text-center leading-tight">
          {recipe.title}
        </h2>

        <Link 
          to={`/recipe/${recipe.id}`} 
          className="mt-4 text-center text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-5 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
