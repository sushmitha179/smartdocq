
// server/src/routes/upload.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error("Only PDF, DOC, DOCX, TXT files are allowed"));
};

const upload = multer({ storage, fileFilter });

// ---------------------- Upload File ----------------------
router.post("/", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
    });
  });
});

// ---------------------- Extract Text ----------------------
router.post("/extract-text", async (req, res) => {
  const { path: filePath } = req.body;
  if (!filePath) return res.status(400).json({ error: "No file path provided" });

  const fullPath = path.join(process.cwd(), filePath.replace(/^\/+/, ""));
  if (!fs.existsSync(fullPath)) return res.status(400).json({ error: "File not found: " + fullPath });

  try {
    const ext = path.extname(fullPath).toLowerCase();
    let text = "";

    if (ext === ".pdf") {
      const pdfModule = await import("pdf-parse/lib/pdf-parse.js");
      const pdf = pdfModule.default ?? pdfModule;
      const buffer = fs.readFileSync(fullPath);
      const data = await pdf(buffer);
      text = data.text;
    } else if (ext === ".docx") {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ path: fullPath });
      text = result.value;
    } else if (ext === ".txt") {
      text = fs.readFileSync(fullPath, "utf8");
    } else {
      return res.status(400).json({ error: "Unsupported file type: " + ext });
    }

    res.json({ text });
  } catch (err) {
    console.error("extract-text error:", err);
    res.status(500).json({ error: "Failed to extract text" });
  }
});

export default router;
