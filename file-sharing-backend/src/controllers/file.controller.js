import db from "../config/db.js"

export const uploadFiles = async (req, res) => {
  try {
    console.log("FILES RECEIVED:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const userId = req.user;

    for (const f of req.files) {
      await db.query(
        `INSERT INTO files
         (user_id, original_name, file_name, mime_type, size, path)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          f.originalname,
          f.filename,
          f.mimetype,
          f.size,
          f.path
        ]
      );
    }

    res.status(201).json({ message: "Files uploaded successfully" });

  } catch (err) {
    console.error("Upload error FULL:", err);
    res.status(500).json({ message: "File upload failed" });
  }
};


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
