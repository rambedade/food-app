import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ useNavigate is inside Router Component

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      alert("Registration successful! Please login.");
      navigate("/login"); // ✅ Redirect to login page
    } else {
      alert("Registration failed! Try again.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-3">
        <input className="border p-2 w-full" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border p-2 w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white px-4 py-2 w-full">Register</button>
      </form>
    </div>
  );
}

export default Register;
