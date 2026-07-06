import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4 relative z-50">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40 filter invert" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left : {credit}
              </p>
            </button>
             
            <p className="text-gray-600 pl-4">Hi, {user.name}</p>
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow"
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    onClick={logout}
                    className="py-1 px-2 cursor-pointer pr-10"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <h3
              onClick={() => navigate("/buy")}
              className="cursor-pointer bg-pink-500 text-white px-4 py-2 text-sm rounded-full"
            >
              Subscription
            </h3>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-800 text-white py-2 px-10 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="flex sm:hidden items-center gap-4">
        {user && (
          <button
            onClick={() => navigate("/buy")}
            className="flex items-center gap-1 bg-blue-100 px-3 py-1.5 rounded-full"
          >
            <img className="w-4" src={assets.credit_star} alt="" />
            <p className="text-xs font-medium text-gray-600">{credit}</p>
          </button>
        )}
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="text-white">
          {showMobileMenu ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {showMobileMenu && (
        <div className="absolute top-16 right-0 left-0 bg-[#0f172a] p-6 flex flex-col items-center gap-4 border border-white/20 rounded-xl shadow-2xl z-50 sm:hidden">
          {user ? (
            <>
              <p className="text-gray-200 text-lg mb-2">Hi, {user.name}</p>
              <button
                onClick={() => { setShowMobileMenu(false); navigate("/buy"); }}
                className="w-full bg-pink-500 text-white px-4 py-3 rounded-full text-center font-medium"
              >
                Subscription
              </button>
              <button
                onClick={() => { setShowMobileMenu(false); logout(); }}
                className="w-full bg-red-600 text-white px-4 py-3 rounded-full text-center font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setShowMobileMenu(false); navigate("/buy"); }}
                className="w-full bg-pink-500 text-white px-4 py-3 rounded-full text-center font-medium"
              >
                Subscription
              </button>
              <button
                onClick={() => { setShowMobileMenu(false); setShowLogin(true); }}
                className="w-full bg-blue-800 text-white px-4 py-3 rounded-full text-center font-medium"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
