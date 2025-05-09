const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom');

// Get all chat rooms for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming middleware sets req.user
    
    const chatRooms = await ChatRoom.find({
      participants: userId
    })
    .populate('participants', 'username profilePicture status')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });
    
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new chat room
router.post('/', async (req, res) => {
  try {
    const { name, participants, isGroupChat } = req.body;
    
    // For direct chats, check if chat already exists
    if (!isGroupChat && participants.length === 2) {
      const existingChat = await ChatRoom.findDirectChat(
        participants[0],
        participants[1]
      );
      
      if (existingChat) {
        return res.json(existingChat);
      }
    }
    
    // Create new chat room
    const newChatRoom = await ChatRoom.create({
      name,
      participants,
      isGroupChat,
      admins: isGroupChat ? [req.user.id] : [] // Set creator as admin for group chats
    });
    
    // Populate participants
    const populatedChatRoom = await ChatRoom.findById(newChatRoom._id)
      .populate('participants', 'username profilePicture status');
    
    res.status(201).json(populatedChatRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get direct chat between two users
router.get('/direct/:userId', async (req, res) => {
  try {
    const chat = await ChatRoom.findDirectChat(
      req.user.id,
      req.params.userId
    );
    
    if (chat) {
      return res.json(chat);
    }
    
    res.status(404).json({ message: 'Chat not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;