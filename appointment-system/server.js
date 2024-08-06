const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');  // Import the CORS package

const app = express();
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/appointments');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectToMongo();

// Schema and Model
const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    artist: String,
    verified: Boolean,
    verificationCode: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Create Appointment
app.post('/appointments', async (req, res) => {
    try {
        console.log('Received appointment request:', req.body);

        const { name, email, phone, date, artist } = req.body;
        const verificationCode = uuidv4();

        const newAppointment = new Appointment({
            name,
            email,
            phone,
            date,
            artist,
        });

        await newAppointment.save();
        console.log('Saved new appointment:', newAppointment);

        return res.status(200).send('Appointment saved successfully');
    } catch (error) {
        console.error('Error processing appointment request:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
