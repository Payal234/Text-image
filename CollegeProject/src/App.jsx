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


const App = () => {
  const {showLogin} = useContext(AppContext)

  return (
    <div className="min-h-screen px-4 sm:px-10 md:px-14 lg:px-28 text-white bg-transparent">
      <ToastContainer />
      <Navbar />

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