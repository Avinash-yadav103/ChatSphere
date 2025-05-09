import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './css/main.css';

function Main() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  
  // Get messages from localStorage or use default ones
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(`messages_${chatId || 'default'}`);
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
    return [
      { id: 1, sender: 'John Doe', text: 'Hey there!', timestamp: '10:30 AM', isCurrentUser: false },
      { id: 2, sender: 'You', text: 'Hi! How are you?', timestamp: '10:31 AM', isCurrentUser: true },
      { id: 3, sender: 'John Doe', text: 'I\'m good, thanks! Working on that project we discussed.', timestamp: '10:32 AM', isCurrentUser: false },
      { id: 4, sender: 'You', text: 'Awesome! Let me know if you need any help.', timestamp: '10:33 AM', isCurrentUser: true },
    ];
  });
  
  // Add a ref for auto-scrolling
  const messageEndRef = useRef(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`messages_${chatId || 'default'}`, JSON.stringify(messages));
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatId]);

  // Handle different chat rooms
  useEffect(() => {
    const savedMessages = localStorage.getItem(`messages_${chatId || 'default'}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [chatId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const username = localStorage.getItem('username') || 'You';
      const newMessage = {
        id: Date.now(),
        sender: username,
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="main">
      <div className="chat-container">
        <div className="message-list">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.isCurrentUser ? 'own-message' : ''}`}>
              <div className="message-info">
                <span className="sender">{msg.sender}</span>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        
        <form className="message-input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Main;
