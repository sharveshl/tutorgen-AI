import express from "express";
import { chatWithAI, submitAssessment } from '../Controllers/studentController.js';
import { protect, requireRole } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post("/chat", protect, requireRole(['student']), chatWithAI);
router.post("/assessment/submit", protect, requireRole(['student']), submitAssessment);

export default router;
