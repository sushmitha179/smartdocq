import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: false }, // optional
    feedback: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
