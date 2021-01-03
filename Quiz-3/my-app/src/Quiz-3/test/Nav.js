import React, { useContext } from "react"
import { Link } from "react-router-dom";
import "./Nav.css"


const Nav = () =>{
  return(
    <nav>
      <ul>
        <li>
          <Link to="/">Index</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

      </ul>
    </nav>
  )
}

export default Nav