import multer from "multer";
import path from "path";
import Reel from "../models/Reel.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

export const uploadFile = (req, res) => {
  upload.single("video")(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "Upload error" });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    try {
      const fileUrl = `/uploads/${req.file.filename}`;
      const newReel = await Reel.create({
        user: req.user.id,
        videoUrl: fileUrl,
        caption: req.body.caption || "",
      });

      res.status(200).json({ message: "File uploaded successfully", reel: newReel });
    } catch (dbError) {
      res.status(500).json({ message: "Error saving reel", error: dbError.message });
    }
  });
};
