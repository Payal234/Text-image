import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 mt-20 text-white">
      <img src={assets.logo} alt="" width={150} className="filter invert" />
      <p className="flex-1 border-none sm:border-l border-white/20 sm:pl-4 text-sm text-gray-400 text-center sm:text-left">
        Copyright 2025 @ AiWithPayal - All Right Reserved.
      </p>

      <div className="flex gap-2.5">
        <img src={assets.facebook_icon} alt="" width={35} className="filter invert opacity-80 hover:opacity-100 cursor-pointer" />
        <img src={assets.instagram_icon} alt="" width={35} className="filter invert opacity-80 hover:opacity-100 cursor-pointer" />
        <img src={assets.twitter_icon} alt="" width={35} className="filter invert opacity-80 hover:opacity-100 cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
