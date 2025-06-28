import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'; // using default import
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js'
// import imageHistoryRouter from './routes/imageHistoryRoutes.js'


const port = process.env.PORT || 4000;
const app = express();
// const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
  // origin: 'http://localhost:5173',
  //  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'token', 'Authorization'], // Adjust if your frontend runs elsewhere
  // credentials: true,
// }))



// Increase the body payload limit to handle large requests (e.g., images)
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ limit: '100mb', extended: true }));

await connectDB ()// calling the function
app.use('/api/user',userRouter)
 app.use('/api/image' , imageRouter)
//  app.use('/api/image-history',imageHistoryRouter)
  


app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
