import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import './public/css/style.css';
import logo from './public/img/logo.png'; 
import Nav from './Nav';
import Index from './index';
export default function App() {
  return (
      <>
        <Router>
            <Nav/>
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>

            
            </Switch>
        </Router>    
      </>
  );
}