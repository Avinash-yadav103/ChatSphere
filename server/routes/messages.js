const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get messages for a chat room
router.get('/:chatRoomId', async (req, res) => {
  try {
    const messages = await Message.find({ chatRoom: req.params.chatRoomId })
      .populate('sender', 'username profilePicture')
      .sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a new message
router.post('/', async (req, res) => {
  try {
    const { chatRoomId, content, sender } = req.body;
    
    const newMessage = await Message.create({
      chatRoom: chatRoomId,
      sender,
      content,
      readBy: [sender]
    });
    
    // Populate sender info
    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'username profilePicture');
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;