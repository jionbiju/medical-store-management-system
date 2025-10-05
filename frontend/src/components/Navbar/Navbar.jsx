import React from 'react'
import logo from '../../assets/logo.jpeg'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='nav-container'>
      <div className="nav-left">
        <img src={logo} alt="MedCare Logo" className="nav-logo" />
        <span className="brand-name">MediCare</span>
      </div>
      <div className="nav-right">
        <Link to='/addMedicine'>
        <button className="nav-button add-btn">Add Medicine</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar