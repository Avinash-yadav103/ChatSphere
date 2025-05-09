const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() {
      return this.isGroupChat === true;
    },
    trim: true
  },
  isGroupChat: {
    type: Boolean,
    default: false
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true
});

// Helper method to find direct chat between two users
chatRoomSchema.statics.findDirectChat = async function(userId1, userId2) {
  try {
    const chat = await this.findOne({
      isGroupChat: false,
      participants: { $all: [userId1, userId2], $size: 2 }
    });
    return chat;
  } catch (error) {
    throw new Error(error.message);
  }
};

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;