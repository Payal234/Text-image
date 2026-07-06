import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();


export const generateImage = async (req, res) => {
  try {
    const { userid, prompt } = req.body;

    const user = await userModel.findById(userid);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Switch to Pollinations AI since Clipdrop is out of credits (402)
    const { data } = await axios.get(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
      {
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/jpeg;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const generateText = async (req, res) => {
  try {
    const { userid, prompt } = req.body;

    const user = await userModel.findById(userid);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Call Gemini API for text generation
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const resultText = response.text;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Text Generated",
      creditBalance: user.creditBalance - 1,
      resultText,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const generateCode = async (req, res) => {
  try {
    const { userid, prompt } = req.body;

    const user = await userModel.findById(userid);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Call Gemini API for code generation
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert programmer. Please generate the code for the following request. Provide ONLY the code without any markdown formatting like \`\`\` or explanations.\n\nRequest:\n${prompt}`,
    });
    
    let resultCode = response.text;
    
    // Fallback logic to strip markdown if the model still includes it
    if (resultCode.startsWith('```')) {
      resultCode = resultCode.replace(/^```[a-z]*\n/i, '').replace(/\n```\s*$/i, '');
    }

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Code Generated",
      creditBalance: user.creditBalance - 1,
      resultCode,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



