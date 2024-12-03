const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    artist: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, default: () => uuidv4() }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
