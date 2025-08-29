import Reel from "../models/Reel.js";
import User from "../models/User.js";

// 📌 Get all reels
export const getReels = async (req, res) => {
  try {
    const reels = await Reel.find()
      .populate("user", "username")
      .populate("comments.user", "username")
      .sort({ createdAt: -1 });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Create new reel
export const createReel = async (req, res) => {
  try {
    const { caption } = req.body;
    const videoUrl = `/uploads/${req.file.filename}`;

    const reel = await Reel.create({
      user: req.user.id,
      videoUrl,
      caption,
    });

    res.status(201).json(reel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Like/Unlike reel
export const toggleLike = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    if (reel.likes.includes(req.user.id)) {
      reel.likes = reel.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      reel.likes.push(req.user.id);
    }

    await reel.save();
    res.json(reel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Add comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    reel.comments.push({ user: req.user.id, text });
    await reel.save();
    res.json(reel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
