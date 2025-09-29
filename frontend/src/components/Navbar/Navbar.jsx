import React from 'react'
import logo from '../../assets/vite.svg'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='nav-container'>
      <div className="nav-left">
        <img src={logo} alt="MedCare Logo" className="nav-logo" />
        <span className="brand-name">MedCare</span>
      </div>
      <div className="nav-right">
        <button className="nav-button add-btn">Add</button>
        <button className="nav-button update-btn">Update</button>
        <button className="nav-button delete-btn">Delete</button>
      </div>
    </nav>
  )
}

export default Navbar