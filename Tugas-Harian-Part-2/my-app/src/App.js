
import './App.css';
import React, { useState } from "react"

import Tugas9 from './Tugas-9/tugas9';
import Tugas10 from './Tugas-10/tugas10';
import Timer from './Tugas-11/tugas11';
import Tugas12 from './Tugas-12/tugas12';

import Tugas13 from './Tugas-13/DaftarBuah';
import Tugas14 from './Tugas-14/DaftarBuah';
import Routes from "./Tugas-15/Routes"

import ThemeContext from "./Tugas-15/ThemeContext"

function App() {
const [theme, setTheme] = useState("light")
  const value = { theme, setTheme }
  return (
    <div className="App">
      <header className="App-header">
      <ThemeContext.Provider value={value}>
          <Routes/>
      </ThemeContext.Provider>
              


      </header>
    </div>
  );
}

export default App;
 