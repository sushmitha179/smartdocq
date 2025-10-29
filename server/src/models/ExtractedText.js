import mongoose from "mongoose";

const extractedTextSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

export const ExtractedText = mongoose.model("ExtractedText", extractedTextSchema);
