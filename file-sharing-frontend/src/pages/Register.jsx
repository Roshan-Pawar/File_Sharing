import { useState } from "react"
import Api from "../services/api"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await Api.post("/api/auth/register", { name, email, password })
      alert("Registration successful")
      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Try Different Credentials")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <input
          className="border p-2.5 w-full mb-4 rounded"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="border p-2.5 w-full mb-4 rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2.5 w-full mb-4 rounded"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="bg-green-600 text-white w-full p-2.5 rounded">
          Register
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
