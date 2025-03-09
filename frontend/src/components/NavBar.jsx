import React from 'react'
import logo from "../assets/logo.png"
import "../styles/navbar.css"
const NavBar = () => {
  return (
    <div className='navbar-container'>
      <div className="logo-container">
        <img src={logo} alt="logo" />
        <h1>ASSIGNER</h1>
      </div>

      <ul>
        <li>HOME</li>
        <li>COMPLETED</li>
        <li>PENDING</li>
      </ul>
      
    </div>
  )
}

export default NavBar
