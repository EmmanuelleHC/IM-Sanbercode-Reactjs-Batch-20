import React from "react"
import './public/css/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from './Nav';


import Index from './index';
import About from './about';
const Routes1 = () =>{

  return (

               <Router>
            <Nav/>
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>

              <Route exact path="/about">
                <About />
              </Route>

            
            
            </Switch>
        </Router>    

  )
}

export default Routes1
