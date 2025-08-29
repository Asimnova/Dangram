import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getReels,
  createReel,
  toggleLike,
  addComment,
} from "../controllers/reelController.js";


const router = express.Router();

// 📂 Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "")),
});
const upload = multer({ storage });

// Routes
router.get("/", getReels);
router.post("/", verifyToken, upload.single("video"), createReel);
router.put("/:id/like", verifyToken, toggleLike);
router.post("/:id/comment", verifyToken, addComment);

export default router;
