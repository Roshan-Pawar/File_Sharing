import express from "express"
import upload from "../config/multer.js"
import protect from "../middlewares/auth.middleware.js"
import { uploadFiles, getMyFiles, shareFile } from "../controllers/file.controller.js"
import generateTempToken from "../utils/generateTempToken.js"
import jwt from "jsonwebtoken"
import db from "../config/db.js"


const router = express.Router()

router.post("/upload", protect, upload.array("files"), uploadFiles)
router.get("/", protect, getMyFiles)
router.post("/share", protect, shareFile)

router.get("/view/:id", protect, async (req, res) => {
  const [[file]] = await db.query(
    "SELECT * FROM files WHERE id = ? AND user_id = ?",
    [req.params.id, req.user]
  )

  if (!file) {
    return res.status(404).json({ message: "File not found" })
  }

  res.setHeader("Content-Type", file.mime_type)
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${file.original_name}"`
  )

  res.sendFile(
    file.path,
    { root: process.cwd() }
  )
})

// generate signed URL
router.get("/signed-url/:id", protect, async (req, res) => {
  const fileId = req.params.id

  const [[file]] = await db.query(
    "SELECT * FROM files WHERE id = ? AND user_id = ?",
    [fileId, req.user]
  )

  if (!file) {
    return res.status(404).json({ message: "File not found" })
  }

  const token = generateTempToken({
    fileId: file.id,
    userId: req.user
  })

  res.json({
    url: `http://localhost:5000/api/files/stream/${file.id}?token=${token}`
  })
})

// stream file using temp token
router.get("/stream/:id", async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.status(401).send("Missing token")
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.fileId !== Number(req.params.id)) {
      return res.status(403).send("Invalid access")
    }

    const [[file]] = await db.query(
      "SELECT * FROM files WHERE id = ?",
      [req.params.id]
    )

    res.setHeader("Content-Type", file.mime_type)
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${file.original_name}"`
    )

    res.sendFile(file.path, { root: process.cwd() })

  } catch {
    res.status(401).send("Token expired or invalid")
  }
})



export default router
