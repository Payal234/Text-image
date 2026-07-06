import express from "express";
import {
  loginUser,
  registerUser,
  userCredits,
  payRazorpay,
  verifyRazorpay,
} from "../controllers/userController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", authUser, userCredits);
userRouter.post("/pay-razor", authUser, payRazorpay);
userRouter.post("/verify-razor", verifyRazorpay); // we can also use authUser here if we want, but webhook or client side verification should be fine.

export default userRouter;