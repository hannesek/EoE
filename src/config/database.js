const mongoose = require('mongoose');
const logger = require('../utils/logger');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appointments';

async function connectToMongo() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info('Connected to MongoDB');
    } catch (err) {
        logger.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connectToMongo;
