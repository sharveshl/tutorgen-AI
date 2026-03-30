import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  apiKey: {
    type: String,
  },

  college: {
    type: String,
  },

  dept: {
    type: String,
  },

  year: {
    type: Number,
  },

  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);