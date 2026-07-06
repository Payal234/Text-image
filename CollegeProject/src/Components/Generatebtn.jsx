import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-8 sm:pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-white py-6 md:py-16 px-4">
        See the Magic. Try Now
      </h1>
      <button
        onClick={() => navigate("/buy")}
        className="inline-flex items-center gap-2 px-8 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-[0_0_15px_rgba(236,72,153,0.3)] m-auto hover:scale-105 transition-all duration-500"
      >
        Subscription
        <img src={assets.star_group} alt="" className="h-6 filter brightness-0 invert" />
      </button>
    </motion.div>
  );
};

export default GenerateBtn;
