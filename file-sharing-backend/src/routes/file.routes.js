import express from "express"
import upload from "../config/multer.js"
import protect from "../middlewares/auth.middleware.js"
import { uploadFiles, getMyFiles, shareFile } from "../controllers/file.controller.js"

const router = express.Router()

router.post("/upload", protect, upload.array("files"), uploadFiles)
router.get("/", protect, getMyFiles)
router.post("/share", protect, shareFile)


export default router
