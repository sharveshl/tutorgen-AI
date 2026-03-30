import { Groq } from "groq-sdk";
import User from "../Model/User.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an AI Tutor named TutorGen for computer science students. Be helpful and to the point.' },
        { role: 'user', content: message }
      ],
      model: "llama3-8b-8192",
    });

    res.json({ reply: chatCompletion.choices[0]?.message?.content || "I couldn't process that request." });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ message: "Failed to communicate with AI Tutor." });
  }
};

export const submitAssessment = async (req, res) => {
  try {
    const { solution } = req.body;
    // Mocking evaluation here; this could be connected to an automated grading tool.
    const newScore = Math.floor(Math.random() * 20) + 80; // random score between 80 and 100
    
    const student = await User.findById(req.user._id);
    student.score = newScore;
    student.performance = 'Excellent';
    student.feedback = 'Good attempt. Ensure better memory usage next time.';
    await student.save();

    res.json({ message: "Assessment submitted successfully", newScore });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
