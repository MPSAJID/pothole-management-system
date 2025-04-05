const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
require('dotenv').config();

const io = new Server(server, {
  cors: {
    origin: process.env.FE_URL, // Update with your frontend URL for security
    methods: ["GET", "POST"]
  }
});

const authRoutes = require('./routes/authRoutes');
const potholeRoutes = require('./routes/potholeRoutes');
const repairRoutes = require('./routes/repairRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require('./routes/notificationRoutes');


const cors = require('cors');
app.use(cors({
  origin: process.env.FE_URL, // Set this in .env
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

let onlineUsers = new Map(); // To track connected users
io.on('connection', (socket) => {
  console.log('⚡ New client connected:', socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) socket.userId = parseInt(userId);

  console.log(`User ${userId} connected with socket ID ${socket.id}`);
  // Store userId with the socket
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
    console.log('⚡ Client disconnected:', socket.id);
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/potholes', potholeRoutes);
app.use('/api/repairs', repairRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);


app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
module.exports = io;

