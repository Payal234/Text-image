import { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import React from "react";
import { assets, plans } from "../assets/assets";
import { motion } from "framer-motion";

import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, token, loadCreditsData, setShowLogin } = useContext(AppContext);

  const handlePayment = async (planId) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/pay-razor`,
        { userid: user._id, planId },
        { headers: { token } }
      );

      if (data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SaV9K9NmF3oVKu',
          amount: data.order.amount,
          currency: data.order.currency,
          name: "AiWithPayal",
          description: "Credits Purchase",
          order_id: data.order.id,
          handler: async (response) => {
            try {
              const verifyRes = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-razor`,
                response,
                { headers: { token } }
              );

              if (verifyRes.data.success) {
                toast.success("Payment successful! Credits added.");
                loadCreditsData();
              } else {
                toast.error(verifyRes.data.message);
              }
            } catch (error) {
              console.log(error);
              toast.error("Payment verification failed");
            }
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10'>

      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Subscription</button>

      <h1 className='text-center text-3xl font-bold mb-6 sm:mb-10'>Choose the Subscription</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index}
            className='bg-pink-50 drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>

            <img src={assets.logo_icon} alt='' width={40} />

            <h3 className='mt-3 mb-1 font-semibold mycolor'>{item.id}</h3>

            <h3 className='text-sm mycolor'>{item.desc}</h3>

            <h3 className='mt-6'>
              <span className='text-3xl font-medium'>₹{item.price}</span> /{" "} {item.credits} credits
            </h3>

            <button
              onClick={() => handlePayment(item.id)}
              className='w-full bg-blue-600 text-white mt-8 text-sm rounded-full py-2.5 min-w-52'>
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

    </motion.div>
  );
};

export default BuyCredit;
