import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import './css/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Use the authService instead of the local login function
      const response = await authService.login({ username, password });
      const data = response.data;
      
      // Store authentication data from MongoDB response
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('isAuthenticated', 'true');
      
      console.log("Login successful:", username);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || 
        error.message || 
        'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="login-container">
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>
      
      <div className="login-form-container">
        <div className="login-form">
          <h2>ChatSphere</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="signup-text">
            Don't have an account? <Link to="/register" style={{ color: '#5865f2', textDecoration: 'none' }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
