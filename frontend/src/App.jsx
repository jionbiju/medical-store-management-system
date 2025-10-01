import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AddMedicine from './pages/AddMedicine/AddMedicine'

const App = () => {
  return (
    <div>
      <ToastContainer position='bottom-right'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addMedicine' element={<AddMedicine/>}/>
      </Routes>
      
    </div>
  )
}

export default App
