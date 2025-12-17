import db from "../config/db.js"

export const uploadFiles = async (req, res) => {
  const files = req.files

  const values = files.map(file => [
    req.user,
    file.originalname,
    file.filename,
    file.mimetype,
    file.size,
    file.path
  ])

  await db.query(
    "INSERT INTO files (user_id, original_name, file_name, mime_type, size, path) VALUES ?",
    [values]
  )

  res.status(201).json({ message: "Files uploaded" })
}

export const getMyFiles = async (req, res) => {
  const [files] = await db.query(
    "SELECT * FROM files WHERE user_id = ?",
    [req.user]
  )
  res.json(files)
}

export const shareFile = async (req, res) => {
  const { fileId, userId } = req.body

  await db.query(
    "INSERT INTO file_shares (file_id, shared_with) VALUES (?, ?)",
    [fileId, userId]
  )

  res.json({ message: "File shared" })
}
