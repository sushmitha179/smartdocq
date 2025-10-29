
// server/src/routes/qa.routes.js
import { Router } from "express";
import {
  answer,
  saveQA,
  getUserHistory,
  saveExtractedText,
  getPreviousQA,
  getRecentQAByFile,
  getExtractedTexts
} from "../controllers/qa.controller.js";

const router = Router();

// 📝 Ask a question (Gemini-powered)
router.post("/answer", answer);

// 💾 Save manual Q&A
router.post("/save-qa", saveQA);
router.get("/previous-questions", getPreviousQA);
// router.get("/history/long-term", getLongTermHistory);
router.get("/recent", getRecentQAByFile);
router.post("/save-text", saveExtractedText);
router.get("/get-extracted", getExtractedTexts);
// 🧠 Fetch user-specific history
router.get("/history/user", getUserHistory);

export default router;
