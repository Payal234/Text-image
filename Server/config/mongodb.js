import mongoose from  "mongoose";
const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log("Database Connected Successfully");
  });

  mongoose.connection.on('error', (err) => {
    console.error("Database Connection Error:", err);
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;


