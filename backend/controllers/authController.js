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