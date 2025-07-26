import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'; // DB connect function
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// ✅ Proper CORS configuration
const corsOptions = {
  origin: 'https://text-image-kappa.vercel.app', // ✅ Frontend deployed URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

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
