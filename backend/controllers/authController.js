// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';


// export const signup = async (req, res) => {
//   try {
//     const { name, username, email, password } = req.body;

//     // Basic validation
//     if (!name || !username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if username already exists
//     const usernameExists = await User.findOne({ username });
//     if (usernameExists) {
//       return res.status(400).json({ message: "Username already taken" });
//     }

//     // Check if email already exists
//     const emailExists = await User.findOne({ email });
//     if (emailExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password and save user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ name, username, email, password: hashedPassword });

//     res.status(201).json({ message: "Signup successful" });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error, please try again later" });
//   }
// };

// export const signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Post from '../models/Post.js'; // make sure you have Post model

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // fetch posts by this user
    const posts = await Post.find({ user: username });

    res.json({
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
      stats: {
        posts: posts.length,
        followers: user.followers?.length || 0,
        following: user.following?.length || 0,
      },
      posts
    });
  } catch (err) {
    console.error("GetUserProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, username, email, password: hashedPassword });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { username: user.username } }); // Return username
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};