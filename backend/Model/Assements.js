import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  topic: {
    type: String,
    required: true,
  },

  question: {
    type: String,
    required: true,
  },

  options: {
    type: [String],
    default: [],
  },

  correctAnswer: {
    type: String,
    required: true,
  },

  userAnswer: {
    type: String,
    default: null,
  },

  isCorrect: {
    type: Boolean,
    default: null,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },

  feedback: {
    type: String,
    default: "",
  }

}, { timestamps: true });

export default mongoose.model("Assessment", assessmentSchema);