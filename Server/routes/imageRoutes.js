import express from "express";
import { generateImage, generateText, generateCode } from "../controllers/imageController.js";
import authUser from "../middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post("/generate-image", authUser, generateImage);
imageRouter.post("/generate-text", authUser, generateText);
imageRouter.post("/generate-code", authUser, generateCode);


export default imageRouter;
