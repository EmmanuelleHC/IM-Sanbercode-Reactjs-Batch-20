import React, { useContext } from "react"
import ThemeContext from "./ThemeContext"

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    
    <button
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      className="button-theme"
    >
     Tema
    </button>
  )
}

export default ThemeSwitcher