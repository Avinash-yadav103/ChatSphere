import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/navigation.css';

function LeftNav() {
    const navigate = useNavigate();
    
    // Example data - replace with actual data from your backend
    const channels = [
        { id: 'general', name: 'General' },
        { id: 'random', name: 'Random' },
        { id: 'introductions', name: 'Introductions' }
    ];
    
    const directMessages = [
        { id: 'user1', name: 'John Doe', status: 'online' },
        { id: 'user2', name: 'Jane Smith', status: 'offline' },
        { id: 'user3', name: 'Alex Johnson', status: 'online' }
    ];
    
    const handleChannelClick = (channelId) => {
        navigate(`/chat/${channelId}`);
    };
    
    return (
        <div className='left_nav'>
            <div className="profile">
                {/* Profile picture already styled in CSS */}
            </div>
            
            <div className="nav-section">
                <h3>Channels</h3>
                <ul className="channel-list">
                    {channels.map(channel => (
                        <li 
                            key={channel.id} 
                            onClick={() => handleChannelClick(channel.id)}
                            className="channel-item"
                        >
                            # {channel.name}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="nav-section">
                <h3>Direct Messages</h3>
                <ul className="dm-list">
                    {directMessages.map(user => (
                        <li 
                            key={user.id}
                            onClick={() => handleChannelClick(user.id)}
                            className="dm-item"
                        >
                            <span className={`status-indicator ${user.status}`}></span>
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default LeftNav;
