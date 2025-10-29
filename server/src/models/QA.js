

// server/src/models/QA.js
import mongoose from "mongoose";

const qaSchema = new mongoose.Schema(
  {
    conversationId: { type: String, required: false },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    source: { type: String, default: "gemini" },
    fileName: { type: String }, // optional, used by recent-by-file queries
    isLongTerm: { type: Boolean, default: false },
    metadata: {
      model: { type: String },
      response_id: { type: String },
      email: { type: String, required: true }, // store user email here
      savedAt: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export const QA = mongoose.model("QA", qaSchema);
