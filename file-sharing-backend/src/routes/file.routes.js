import express from "express"
import upload from "../config/multer.js"
import protect from "../middlewares/auth.middleware.js"
import { uploadFiles, getMyFiles, shareFile } from "../controllers/file.controller.js"
import generateTempToken from "../utils/generateTempToken.js"
import jwt from "jsonwebtoken"
import db from "../config/db.js"
import crypto from "crypto";


const router = express.Router()

router.post("/upload", (req, res, next) => {
  console.log("Upload hit");
  next();
});

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
  const { token } = req.query;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const [[file]] = await db.query(
    "SELECT * FROM files WHERE id = ?",
    [decoded.fileId]
  );

  res.redirect(file.path);
});


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

export default router