
// server/src/index.js
import 'dotenv/config';   // loads .env automatically
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDB } from './db.js';
import { config } from './config.js';
import authRoutes from './routes/auth.routes.js';
//import qaRoutes from "./routes/qa.js";
import userRoutes from './routes/user.routes.js';
import convRoutes from './routes/conversation.routes.js';
import qaRoutes from './routes/qa.routes.js';
import uploadRouter from './routes/upload.js'; // ✅ upload router
import feedbackRoutes from "./routes/feedback.routes.js";
import { notFound, errorHandler } from './middleware/error.js';
import { Conversation } from './models/Conversation.js';
import chatbotRoutes from "./routes/chatbot.routes.js";



import path from 'path';

// Ensure TTL index for conversations.expiresAt
Conversation.collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(() => {});

const app = express();

// Security & logging
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// CORS for frontend
app.use(cors({
  origin: config.clientOrigin, // e.g., http://localhost:5173
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
app.use('/api/upload', uploadRouter); // ✅ mount upload router
app.use("/api/feedback", feedbackRoutes);
app.use("/api/chatbot", chatbotRoutes);
// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(config.port, () => console.log(`API running on http://localhost:${config.port}`));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
