// server/src/index.js (Corrected Version)
import 'dotenv/config';   // loads .env automatically
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';  // ✅ KEEP this one
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDB } from './db.js';
import { config } from './config.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import convRoutes from './routes/conversation.routes.js';
import qaRoutes from './routes/qa.routes.js';
import uploadRouter from './routes/upload.js';
import feedbackRoutes from "./routes/feedback.routes.js";
import { notFound, errorHandler } from './middleware/error.js';
import { Conversation } from './models/Conversation.js';
import chatbotRoutes from "./routes/chatbot.routes.js";
import path from 'path';

// Ensure TTL index for conversations.expiresAt
Conversation.collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(() => { });

const app = express();

// Security & logging
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// CORS Configuration (Corrected to use the imported 'cors')
const clientOrigin = 'https://smartdocq.onrender.com'; // Your live client URL
const allowedOrigins = [
  clientOrigin,
  'https://smartdocq-server-6lfv.onrender.com', // Server's own URL, for safety
  'http://localhost:3000' // Keep for local development
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health check
app.get('/api/health', (_, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/conversations', convRoutes);
app.use('/api/qa', qaRoutes);
app.use('/api/upload', uploadRouter);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to DB and start server (FIXED: Use process.env.PORT)
connectDB()
  .then(() => {
    // Render provides a 'PORT' environment variable that MUST be used.
    const port = process.env.PORT || config.port;
    app.listen(port, () => console.log(`API running on port ${port}`));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });