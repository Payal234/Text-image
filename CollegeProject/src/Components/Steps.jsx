import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32"
    >
      <h1 className="text-white bg-white/10 backdrop-blur-md inline-flex text-3xl sm:text-0xl font-bold text-center gap-2 px-12 sm:px-28 py-4 rounded-full border border-gray-600 hover:scale-105 transition-all duration-700 shadow-lg">
        How AI Magic Works
      </h1>
      <p className="text-lg text-gray-300 mb-8 mt-4">
        Transform Texts Into Stunning Images, Code & Stories
      </p>

      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 px-8 bg-white/5 backdrop-blur-sm shadow-xl border border-white/10 cursor-pointer hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 rounded-xl"
          >
            <img width={40} src={item.icon} alt="" className="invert opacity-80" />
            <div>
              <h2 className="text-xl font-medium text-white">{item.title}</h2>
              <p className="text-pink-400 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
