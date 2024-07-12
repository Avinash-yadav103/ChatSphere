import React from 'react'
import './css/navigation.css'
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

function TopNav() {
  return (
    <div>
      <div className="top_nav">
        <p>Destroyers</p>
        <div className="search">
            
        </div>
        <button class="button">Sign Up</button>
        <Router>
        <Routes>
          <Route exact path="/login" component={<Login/>} />
        </Routes>
        </Router>
      </div>
    </div>
  )
}

export default TopNav
