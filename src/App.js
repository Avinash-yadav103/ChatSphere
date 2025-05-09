import React from 'react';
import './App.css';
import LeftNav from './components/LeftNav';
import TopNav from './components/TopNav';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

function App() {
  // Check authentication status once during component render
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Create a wrapper component for protected routes using newer pattern
  const ProtectedLayout = () => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="navigations">
        <LeftNav />
        <div className="right_section">
          <TopNav />
          <Outlet /> {/* This will render the child route components */}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
        
        {/* Protected routes using a layout pattern */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/chat/:chatId" element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
