// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import passport from 'passport';
// import './config/db.js';
// import './config/passport.js';
// import authRoutes from './routes/auth.js';
// import path from "path";
// import postsRoutes from "./routes/posts.js";
// import uploadRoutes from "./routes/upload.js";

// dotenv.config();

// const app = express();

// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(passport.initialize());

// app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// app.use('/api/auth', authRoutes);


// app.use("/api/posts", postsRoutes);
// app.use("/api/upload", uploadRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`🚀 Server running on port ${process.env.PORT}`);
// });



import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { connectDB } from './config/db.js'; // Updated import if db.js exports connectDB
import './config/passport.js';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import uploadRoutes from './routes/upload.js';
import path from 'path';
import reelRoutes from './routes/reelRoutes.js';

dotenv.config();
connectDB(); // Call to connect to DB

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use('/api/auth', authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/reels", reelRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});