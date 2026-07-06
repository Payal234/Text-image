import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongodb.js'; // DB connect function
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import cors from'cors';

import dns from 'dns'
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Connect DB
await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Test Route
app.get('/', (req, res) => {
  res.send('API Working ✅');
});

// Start Server (Only works properly on Render, Railway etc. — Not Vercel)
app.listen(port, () => {
  console.log(`🚀 Server started on PORT: ${port}`);
});
