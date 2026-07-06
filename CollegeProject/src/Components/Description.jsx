import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl text-white">Generate AI Content</h1>
      <p className="text-gray-300 mb-8 mt-2">Bring Creative Vision to Life</p>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
          alt="AI Futuristic"
          className="w-full max-w-[320px] md:w-80 xl:w-96 rounded-xl shadow-2xl border border-white/20"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4 text-white">
            Introducing the AI Website - Your Ultimate Content Generator
          </h2>
          <p className="text-gray-300 mb-4">
            Effortlessly bring your ideas to life with our free AI content
            generator. Transform your text into stunning visuals, engaging
            stories, and functional code in seconds. Imagine, describe, and see your vision come to life instantly.
          </p>
          <p className="text-gray-300 mb-4">
            Type a text prompt, and our advanced AI will generate high-quality
            results in seconds. From product visuals to software scripts and
            creative writing, even non-existent concepts come to life effortlessly.
            Unleash limitless creativity with our AI technology.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
