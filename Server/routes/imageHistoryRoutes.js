// import express from 'express';
// import ImageHistoryModel from '../models/ImageHistoryModel.js';

// const router = express.Router();

// // Add new image generation history
// router.post('/add', async (req, res) => {
//   try {
//     const { userid, prompt, imageUrl } = req.body;
//     if (!userid || !prompt || !imageUrl) {
//       return res.status(400).json({ success: false, message: 'Missing fields' });
//     }

//     const newHistory = new ImageHistoryModel({ userid, prompt, imageUrl });
//     await newHistory.save();

//     res.json({ success: true, message: 'History saved' });
//   } catch (error) {
//     console.error('Error saving image history:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // Get image history by userId
// router.get('/user/:userid', async (req, res) => {
//   try {
//     const { userid } = req.params;
//     const histories = await ImageHistoryModel.find({ userid }).sort({ createdAt: -1 });
//     res.json({ success: true, histories });
//   } catch (error) {
//     console.error('Error fetching image history:', error);
//     res.status(500).json({ success: false, message: 'Server error' , error: error.message});
//   }
// });



// export default router;
