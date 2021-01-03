import React, { useContext } from "react"
import { Link } from "react-router-dom";
import logo from './public/img/logo.png';

import "./style.css";

import "./Nav.css"
const Nav = () =>{ 
  return(
    <div>
    <nav>
     <img id="logo" src={logo} alt="Logo" width="200px" ></img>
     
            
      
      <ul>
        <li>
          <Link  to="/">Index</Link>
        </li>
        <li>
          <Link  to="/about">About</Link>
        </li>
         <li>
          <Link  to="/login">Login</Link>
        </li>
      </ul>
    </nav>
    </div>
  )
}


export default Nav