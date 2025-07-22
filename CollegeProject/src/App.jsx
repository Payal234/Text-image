import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/login'
import { AppContext } from './Context/AppContext'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ThemeToggle from './Components/ThemeToggle'


const App = () => {
  const {showLogin} = useContext(AppContext)

 
  return (
    
     
     <div className="min-h-screen px-4 sm:px-10 md:px-14 lg:px-28 
                    bg-gradient-to-b from-teal-50 to-pink-50 
                    dark:from-gray-900 dark:to-gray-800 
                    text-black dark:text-white 
                    transition-colors duration-300">
      <ToastContainer />
      <Navbar />
            <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
         

      </Routes>
      <Footer/>

    </div>
  )
}

export default App