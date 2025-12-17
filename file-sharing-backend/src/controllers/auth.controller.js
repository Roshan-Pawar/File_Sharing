import bcrypt from "bcrypt"
import db from "../config/db.js"
import generateToken from "../utils/generateToken.js"

export const register = async (req, res) => {
  const { name, email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)

  await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed]
  )

  res.status(201).json({ message: "User registered" })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const [[user]] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  )

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  })
}
