import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment",
    required: true,
  },

  isCorrect: {
    type: Boolean,
    required: true,
  },

  explanation: {
    type: String,
    required: true,
  },

  improvementTip: {
    type: String,
    default: "",
  },

  weakConcept: {
    type: String,
    default: "",
  }

}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);