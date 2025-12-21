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
    // for local
    // url: `http://localhost:5000/api/files/stream/${file.id}?token=${token}`
    //for production
    url: `${process.env.BACKEND_URL}/api/files/stream/${file.id}?token=${token}`
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

router.post("/share/:fileId", protect, async (req, res) => {
  const fileId = req.params.fileId
  const token = crypto.randomBytes(32).toString("hex")

  // Ensure file belongs to user
  const [[file]] = await db.query(
    "SELECT id FROM files WHERE id = ? AND user_id = ?",
    [fileId, req.user]
  )

  if (!file) {
    return res.status(403).json({ message: "Access denied" })
  }

  await db.query(
    `INSERT INTO file_shares (file_id, share_token, expires_at)
     VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY))`,
    [fileId, token]
  )

  res.json({
    // shareLink: `http://localhost:5173/shared/${token}`
    shareLink: `https://file-sharing-jade.vercel.app/shared/${token}`
  })
})

router.get("/shared/:token", protect, async (req, res) => {
  const [[file]] = await db.query(
    `SELECT files.*
     FROM file_shares
     JOIN files ON file_shares.file_id = files.id
     WHERE file_shares.share_token = ?
     AND file_shares.expires_at > NOW()`,
    [req.params.token]
  )

  if (!file) {
    return res.status(404).json({ message: "Link invalid or expired" })
  }

  res.setHeader("Content-Type", file.mime_type)
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${file.original_name}"`
  )

  res.sendFile(file.path, { root: process.cwd() })
})




export default router
