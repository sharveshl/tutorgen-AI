import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Role & Hierarchy Logic
  role: {
    type: String,
    enum: ["super_admin", "dean", "hod", "mentor", "student"],
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  
  // Specific assignments
  college: { type: String }, // Provided to Dean
  dept: {
    type: String,
    enum: ["cse", "aids", "csbs", "aiml", "eee", "ece"],
  }, // Provided to HOD and inheritors
  year: {
    type: String,
    enum: ["1st", "2nd", "3rd", "4th"],
  }, // Provided to Mentor and inheritors
  
  // Student Stats Logic (Defaults provided so we can test the UI right away)
  score: { type: Number, default: 0 },
  performance: { type: String, default: 'Pending Validation' },
  roadmap: { type: String, default: 'Core Fundamentals' },
  strengths: { type: [String], default: [] },
  weaknesses: { type: [String], default: [] },
  feedback: { type: String, default: 'Welcome! Complete your first assessment to receive personalized feedback.' }

}, { timestamps: true });

export default mongoose.model("User", userSchema);