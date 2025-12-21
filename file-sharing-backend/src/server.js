import dotenv from "dotenv"
dotenv.config()

import app from "./app.js"

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await db.query("SELECT 1")
    console.log("MySQL Connected")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error("DB connection failed:", err.message)
    process.exit(1)
  }
}

startServer()
