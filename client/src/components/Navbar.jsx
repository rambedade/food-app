import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className=" bg-[#ae7eec]    shadow-lg p-4 text-white-900 flex justify-between items-center px-8">
      {/* Logo */}
      <Link 
        to="/" 
        className="text-3xl font-extrabold tracking-wide hover:text-yellow-500 transition-all duration-300"
      >
        Recipe<span className="text-yellow-300">App</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 text-lg font-medium">
        <Link to="/" className="hover:text-yellow-500 transition-all text-2xl duration-200">Home</Link>
        <Link to="/#" className="hover:text-yellow-500 transition-all text-2xl duration-200">About</Link>
        <Link to="/#" className="hover:text-yellow-500 transition-all text-2xl duration-200">Recipes</Link>
        {user && <Link to="/saved" className="hover:text-yellow-300 transition-all duration-200">Saved Recipes</Link>}
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center gap-6">
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-500 text-lg font-medium transition-all duration-200">Login</Link>
            <Link to="/register" className="bg-yellow-300 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
