import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongodb.js'; // DB connect function
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'https://text-image-kappa.vercel.app',
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
