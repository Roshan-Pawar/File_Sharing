import api from "../services/Api";
import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", data.token)
      login(data)
      navigate("/dashboard")
    } catch {
      alert("Invalid credentials")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button>Login</button>
    </form>
  )
}

export default Login
