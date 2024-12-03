// This is your backend server file
const express = require('express');
const path = require('path');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/appointments', appointmentRoutes);

// Handle all page routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/pages/:page', (req, res) => {
    res.sendFile(path.join(__dirname, `../public/pages/${req.params.page}`));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
