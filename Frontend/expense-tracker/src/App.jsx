import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from "./Pages/Dashboard/Home.jsx"
import Login from "./Pages/Auth/Login.jsx"
import SignUp from "./Pages/Auth/SignUp.jsx"
import Expense from "./Pages/Dashboard/Expense.jsx";
import Income from "./Pages/Dashboard/Income.jsx";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/expense' element={<Expense />} />
          <Route path='/income' element={<Income />} />     
        </Routes>
      
    </div>
  )
}

export default App