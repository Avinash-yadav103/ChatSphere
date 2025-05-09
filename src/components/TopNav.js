import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/navigation.css';

function TopNav() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const username = localStorage.getItem('username');

  // Determine chat title based on current chatId
  const getChatTitle = () => {
    if (!chatId) return "General Chat";
    
    // These would be fetched from your data source
    if (chatId === 'general') return "General";
    if (chatId === 'random') return "Random";
    if (chatId === 'introductions') return "Introductions";
    
    // Handle direct messages
    if (chatId === 'user1') return "John Doe";
    if (chatId === 'user2') return "Jane Smith";
    if (chatId === 'user3') return "Alex Johnson";
    
    return "Chat";
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/login');
  };

  return (
    <div className="top_nav">
      <p>{getChatTitle()}</p>
      <div className="user-controls">
        {username ? (
          <>
            <span className="username">Welcome, {username}</span>
            <button className="button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="button" onClick={handleSignUp}>Sign Up</button>
        )}
      </div>
    </div>
  );
}

export default TopNav;
