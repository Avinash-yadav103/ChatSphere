import React from 'react';
import './App.css';
import LeftNav from './components/LeftNav';
import TopNav from './components/TopNav';
import Main from './components/Main';
import Login from './components/Login';
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="navigations">
      <LeftNav/>
        <div className="right_section">
        <TopNav/>
        <Main />
        </div> 
      </div>
      
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
