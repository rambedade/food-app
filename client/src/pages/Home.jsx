import { useState } from "react";
import axios from "axios";
import RecipeList from "../components/RecipeList";
import { CiSearch } from "react-icons/ci";
import { BASE_URL } from "../config";


function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      console.log(`Fetching from: ${BASE_URL}/api/recipes/search?query=${query}`);
  
      const response = await axios.get(
        `${BASE_URL}/api/recipes/search?query=${query}`,
        { withCredentials: true } // Ensure credentials are sent if needed
      );
  
      console.log("API Response:", response.data); // ✅ Log response
  
      if (!response.data || response.data.length === 0) {
        setError("No recipes found.");
      }
  
      setRecipes(response.data);
    } catch (err) {
      console.error("Error fetching recipes:", err.response || err.message);
      setError("Error fetching recipes. Please check the console.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-4">
      {/* Search Bar at the Top */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex flex-col sm:flex-row items-center gap-4 w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          Find Your Favorite Recipes
        </h2>
        <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search for delicious recipes..."
            className="px-4 py-3 w-full text-gray-700 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={fetchRecipes}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 flex items-center justify-center md:w-auto transition-all duration-200"
          >
            <CiSearch className="text-xl" />
          </button>
        </div>
      </div>

      {/* Top Banner */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Simple Recipes Made for{" "}
          <span className="italic text-purple-700">
            real, actual, everyday life.
          </span>
        </h1>
      </div>

      {/* Featured Images Section */}
      <div className="grid grid-cols-1 ml-8 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 mx-auto ">
        {[
          {
            name: "Healthy",
            img: "https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Spicy-Peanut-Chicken-Salad-Soba-4.jpg",
          },
          {
            name: "Soups",
            img: "https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/07/620618-1-eng-GB_spicy-mexican-tortilla-soup-with-avocado-salsa-768x960.jpg",
          },
          {
            name: "Winter",
            img: "https://www.averiecooks.com/wp-content/uploads/2021/01/garlicbutterchicken-5.jpg",
          },
          {
            name: "Vegetarian",
            img: "https://tamingofthespoon.com/wp-content/uploads/2024/01/Easy-Chicken-Tinga-Tostadas-R0-1.jpg",
          },
        ].map((item) => (
          <div key={item.name} className="relative">
            <img
              src={item.img}
              alt={item.name}
              className="w-86 h-91 object-cover rounded-lg"
            />
            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-3 py-1 rounded">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 mt-6 mx-auto max-w-screen-lg">
        {[
          {
            name: "Quick & Easy",
            img: "https://pinchofyum.com/wp-content/uploads/Hawaiian-Chicken-Tacos-5-183x183.jpg",
          },
          {
            name: "Dinner",
            img: "https://pinchofyum.com/wp-content/uploads/Rigatoni-with-Sausage-1-183x183.jpg",
          },
          {
            name: "Vegetarian",
            img: "https://pinchofyum.com/wp-content/uploads/Cauliflower-Black-Bean-Tostadas-4-183x183.jpg",
          },
          {
            name: "Healthy",
            img: "https://pinchofyum.com/wp-content/uploads/Spicy-Peanut-Chicken-Salad-Soba-4-183x183.jpg",
          },
          {
            name: "Instant Pot",
            img: "https://pinchofyum.com/wp-content/uploads/Chicken-Tinga-Tacos-5-183x183.jpg",
          },
          {
            name: "Vegan",
            img: "https://pinchofyum.com/wp-content/uploads/Meal-Prep-Pasta-with-Cauliflower-183x183.jpg",
          },
          {
            name: "Meal Prep",
            img: "https://pinchofyum.com/wp-content/uploads/Family-Style-Pitas-2-183x183.jpg",
          },
          {
            name: "Soups",
            img: "https://pinchofyum.com/wp-content/uploads/Tortilla-Soup-183x183.jpg",
          },
          {
            name: "Salads",
            img: "https://pinchofyum.com/wp-content/uploads/Kale-Apple-Salad-6-2-183x183.jpg",
          },
        ].map((category) => (
          <div key={category.name} className="text-center">
            <img
              src={category.img}
              alt={category.name}
              className="w-16 h-16 rounded-full object-cover mx-auto"
            />
            <p className="text-xs sm:text-sm font-semibold mt-2">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Display Recipes */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default Home;
