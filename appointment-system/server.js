const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

// Serve static files from the "appointment-system" directory
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

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hannes.kullbergv2@gmail.com',
        pass: 'txkmJAG66DU'
    },
    logger: true,  // Enable verbose logging
    debug: true    // Show debug output
});

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
            verified: false,
            verificationCode
        });

        await newAppointment.save();
        console.log('Saved new appointment:', newAppointment);

        const mailOptions = {
            from: 'hannes.kullbergv2@gmail.com',
            to: email,
            subject: 'Appointment Verification',
            text: `Please verify your appointment by clicking the following link: http://localhost:3000/verify/${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error sending email');
            }
            console.log('Email sent:', info.response);
            return res.status(200).send('Verification email sent successfully');
        });
    } catch (error) {
        console.error('Error processing appointment request:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Verify Email
app.get('/verify/:code', async (req, res) => {
    try {
        const appointment = await Appointment.findOne({ verificationCode: req.params.code });
        if (!appointment) return res.status(400).send('Invalid verification code');

        appointment.verified = true;
        await appointment.save();
        res.send('Email verified. Your appointment is confirmed.');
    } catch (error) {
        console.error('Error verifying appointment:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
