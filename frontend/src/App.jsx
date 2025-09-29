import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <ToastContainer position='bottom-right'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      
    </div>
  )
}

export default App
