import React from 'react';
import './App.css';
import LeftNav from './components/LeftNav';
import TopNav from './components/TopNav';
import Main from './components/Main';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  // Simulate authentication (replace with real auth later)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <div className="navigations">
                <LeftNav />
                <div className="right_section">
                  <TopNav />
                  <Main />
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="/chat/:chatId" element={
          isAuthenticated ? (
            <div className="navigations">
              <LeftNav />
              <div className="right_section">
                <TopNav />
                <Main />
              </div>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
