import Api from "../services/api";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      login(data);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">NUA's File Sharing</h2>
          <p className="text-sm text-gray-500 mt-1">
            Securely Store and Share files
          </p>
        </div>

        <input
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2.5 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2.5 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          required
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2.5 rounded font-medium transition">
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
