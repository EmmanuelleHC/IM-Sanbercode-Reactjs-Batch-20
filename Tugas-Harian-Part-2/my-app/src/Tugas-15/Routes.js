import React, { useContext } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ThemeContext from "./ThemeContext"
import ThemeSwitcher from "./ThemeSwitcher"
import "./Theme.css"



import Tugas9 from '../Tugas-9/tugas9'
import Tugas10 from '../Tugas-10/tugas10'
import Timer from '../Tugas-11/tugas11'
import Tugas12 from '../Tugas-12/tugas12'

import Tugas13 from '../Tugas-13/DaftarBuah'
import Tugas14 from '../Tugas-14/DaftarBuah'
const Routes = () =>{
const { theme } = useContext(ThemeContext)

  return (
           <Router>
          <nav className={theme} >
            <ul>
              <li>
                <Link to="/">Tugas 9</Link>
              </li>
              <li>
                <Link to="/tugas10">Tugas 10</Link>
              </li>
              <li>
                <Link to="/tugas11">Tugas 11</Link>
              </li>
              <li>
                <Link to="/tugas12">Tugas 12</Link>
              </li>
              <li>
                <Link to="/tugas13">Tugas 13</Link>
              </li>
              <li>
                <Link to="/tugas14">Tugas 14</Link>
              </li>

            </ul>
          </nav>
          <ThemeSwitcher/>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>  
            <Route exact path="/">
              <Tugas9 />
            </Route>
              <Route exact path="/tugas10">
              <Tugas10 />
            </Route>
            <Route exact path="/tugas11">
              <Timer start={4} />
            </Route>

            <Route exact path="/tugas12" component={Tugas12}/>
            <Route exact path="/tugas13" component={Tugas13}/>
            <Route exact path="/tugas14" component={Tugas14}/>

          </Switch>
      </Router>
     
  )
}

export default Routes
