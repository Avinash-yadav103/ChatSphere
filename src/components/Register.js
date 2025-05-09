import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/login.css';

async function register(username, email, password) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    // Store JWT token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('userId', data._id);
    localStorage.setItem('isAuthenticated', 'true');
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      // Use the real API call
      const data = await register(username, email, password);
      
      console.log("Registration successful:", data);
      
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || 'Registration failed.');
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
          <h2>ChatSphere Registration</h2>
          <form onSubmit={handleRegister}>
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
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
            <button type="submit" className="login-button">Register</button>
          </form>
          <p className="signup-text">
            Already have an account? <Link to="/login" style={{ color: '#5865f2', textDecoration: 'none' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;