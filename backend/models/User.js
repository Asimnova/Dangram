import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true, sparse: true },
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  avatar: String
}, { timestamps: true });

 const User = mongoose.model("User" , userSchema)

 export default User