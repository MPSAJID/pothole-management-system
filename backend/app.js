const express = require('express');
const app = express();
require('dotenv').config();

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

