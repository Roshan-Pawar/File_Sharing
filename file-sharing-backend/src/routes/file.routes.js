import express from "express"
import upload from "../config/multer.js"
import protect from "../middlewares/auth.middleware.js"
import { uploadFiles, getMyFiles, shareFile } from "../controllers/file.controller.js"
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
})

router.post("/share/:fileId", protect, async (req, res) => {
  const { emails } = req.body; // array
  const fileId = req.params.fileId;

  if (!emails || emails.length === 0) {
    return res.status(400).json({ message: "No emails provided" });
  }

  const [[file]] = await db.query(
    "SELECT id FROM files WHERE id = ? AND user_id = ?",
    [fileId, req.user]
  );

  if (!file) {
    return res.status(403).json({ message: "Access denied" });
  }

  for (const email of emails) {
    const [[user]] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    await db.query(
      `INSERT INTO file_shares
       (file_id, shared_by, shared_with_email, shared_with_user)
       VALUES (?, ?, ?, ?)`,
      [fileId, req.user, email, user?.id || null]
    );
  }

  res.json({ message: "File shared successfully" });
});


router.get("/shared-with-me", protect, async (req, res) => {
  const [files] = await db.query(
    `
    SELECT files.*
    FROM file_shares
    JOIN files ON file_shares.file_id = files.id
    WHERE file_shares.shared_with_user = ?
       OR file_shares.shared_with_email = (
         SELECT email FROM users WHERE id = ?
       )
    `,
    [req.user, req.user]
  );

  res.json(files);
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const fileId = req.params.id;

    const [[file]] = await db.query(
      "SELECT * FROM files WHERE id = ? AND user_id = ?",
      [fileId, req.user]
    );

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const publicId = file.path
      .split("/")
      .slice(-2)
      .join("/")
      .replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });

    await db.query("DELETE FROM file_shares WHERE file_id = ?", [fileId]);

    await db.query("DELETE FROM files WHERE id = ?", [fileId]);

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("Delete file error:", err);
    res.status(500).json({ message: "Failed to delete file" });
  }
});



export default router