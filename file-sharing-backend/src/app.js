import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import fileRoutes from "./routes/file.routes.js"

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use("/api/auth", authRoutes)
app.use("/api/files", fileRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running")
})


export default app
