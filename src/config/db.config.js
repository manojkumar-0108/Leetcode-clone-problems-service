
const mongoose = require('mongoose');
const { ATLAS_DB_URL, NODE_ENV } = require('./server.config');
const logger = require('./logger.config');

async function connectToDB() {
    try {
        if (NODE_ENV == 'development') {
            await mongoose.connect(ATLAS_DB_URL);
        } else if (NODE_ENV == 'production') {
        }
    } catch (error) {
        logger.error({ message: 'Unable to connect to the DB server!', error: error });
        console.log('Unable to connect to the DB server!');
    }
}


module.exports = {
    connectToDB
};