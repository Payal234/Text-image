import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } }); //  user:{name:user.name}})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// credits
const userCredits = async (req, res) => {
  try {
    const { userid } = req.body;

    const user = await userModel.findById(userid);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy',
  key_secret: process.env.RAZORPAY_Key_SECRET || 'dummy',
});

const payRazorpay = async (req, res) => {
  try {
    const { userid, planId } = req.body;
    
    if (!userid || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let credits, amount;

    switch (planId) {
      case 'Basic':
        amount = 10;
        credits = 15;
        break;
      case 'Advanced':
        amount = 30;
        credits = 70;
        break;
      case 'Premier':
        amount = 50;
        credits = 150;
        break;
      default:
        return res.json({ success: false, message: "Invalid Plan" });
    }

    const options = {
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 10 * 100 = 1000 paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { planId, userid, credits },
    };

    const order = await razorpayInstance.orders.create(options);
    if (!order) {
      return res.json({ success: false, message: "Error creating Razorpay order" });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || "Razorpay API Error" });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Create expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_Key_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Fetch the order from Razorpay to safely get the credits note
      const order = await razorpayInstance.orders.fetch(razorpay_order_id);
      
      const { userid, credits } = order.notes;

      // Update user credits
      const user = await userModel.findById(userid);
      const newCredits = user.creditBalance + parseInt(credits);
      
      await userModel.findByIdAndUpdate(userid, { creditBalance: newCredits });

      res.json({ success: true, message: "Payment verified successfully", credits: newCredits });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, userCredits, payRazorpay, verifyRazorpay };
