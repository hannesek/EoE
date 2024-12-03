require('dotenv').config();
const app = require('./src/app');
const connectToMongo = require('./src/config/database');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

// Start server after connecting to database
connectToMongo().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });
});