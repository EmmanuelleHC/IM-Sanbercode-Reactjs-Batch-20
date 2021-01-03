import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Nav from './Nav';
import Index from './index';
import About from './about';
import Login from './login';
//import { ThemeProvider } from "./ThemeContext";

export default function App() {
  return (
      <>
        <Router>
            <Nav/>
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>
               <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>

            
            </Switch>
            //Theme Provider
        </Router>    
      </>
  );
}