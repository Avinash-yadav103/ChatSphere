import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout')
};

export const messageService = {
  getMessages: (chatRoomId) => api.get(`/messages/${chatRoomId}`),
  sendMessage: (messageData) => api.post('/messages', messageData)
};

export const chatRoomService = {
  getChatRooms: () => api.get('/chatrooms'),
  createChatRoom: (roomData) => api.post('/chatrooms', roomData),
  getDirectChat: (userId) => api.get(`/chatrooms/direct/${userId}`)
};

export default api;