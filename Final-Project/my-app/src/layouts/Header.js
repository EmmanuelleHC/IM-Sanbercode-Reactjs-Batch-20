import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header =() =>{
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }

  return(    
    <header>
      <img id="logo" alt="logo" src="/img/logo.png" width="200px" />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          { user === null && <li><Link to="/register">Register </Link></li> }    
          { user && <li><Link to="/games">Game List </Link></li> }
          { user && <li><Link to="/movies">Movie List </Link></li> }
          { user === null && <li><Link to="/login">Login </Link></li> }
          { user && <li><Link to="/change_password">Change Password</Link></li> }
          { user && <li><a style={{cursor: "pointer"}} onClick={handleLogout}>Logout </a></li> }
        </ul>
      </nav>
    </header>
  )
}

export default Header