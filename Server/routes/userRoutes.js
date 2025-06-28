import express from "express";
import {
  loginUser,
  registerUser,
  userCredits,
} from "../controllers/userController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", authUser, userCredits);

export default userRouter;
