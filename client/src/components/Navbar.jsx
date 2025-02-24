import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-black">
        Recipe<span className="text-yellow-500">App</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6">
        <Link to="/" className="hover:text-yellow-500 transition-all duration-200">Home</Link>
        <Link to="/#" className="hover:text-yellow-500 transition-all duration-200">About</Link>
        <Link to="/#" className="hover:text-yellow-500 transition-all duration-200">Recipes</Link>
        {user && <Link to="/saved-recipes" className="hover:text-yellow-500 transition-all duration-200">Saved Recipes</Link>}
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold transition-all duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-500 transition-all duration-200">Login</Link>
            <Link to="/register" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all duration-200">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
