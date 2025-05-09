import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Set your dummy credentials here
  const DUMMY_USERNAME = 'testuser';
  const DUMMY_PASSWORD = 'testpass';

  // Check if already logged in
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Trim whitespace from inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    if (trimmedUsername === DUMMY_USERNAME && trimmedPassword === DUMMY_PASSWORD) {
      // Set authentication
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', trimmedUsername);
      setError('');
      navigate('/');
    } else {
      setError('Invalid username or password');
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
            Dummy login: <b>testuser</b> / <b>testpass</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
