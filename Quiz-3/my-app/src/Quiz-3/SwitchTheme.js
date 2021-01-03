import React, {useContext} from "react"
import { ThemeContext } from "./ThemeContext"

const SwitchTheme = ()=>{
  const [theme, setTheme] = useContext(ThemeContext)

  const changeTheme = ()=>{
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return(
    <div style={{textAlign: "center", marginTop: "20px"}}>
      <button onClick={changeTheme} style={{borderRadius: "10px", padding: "10px", cursor: "pointer"}}> Change Navbar to {theme === "dark" ? "Light Theme" : "Dark Theme"}</button>
    </div>
  )
}


export default SwitchTheme