const { CosmosClient } = require("@azure/cosmos");

require('dotenv').config();

const endpoint = process.env.COSMOS_END_POINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE_ID;
const containerId = process.env.COSMOS_CONTAINER_ID;


const client = new CosmosClient({
    endpoint,
    key
});
const database = client.database(databaseId);
const container = database.container(containerId);

async function logToCosmosDB(level, message) {
    try {
        //structure of the document
        await container.items.create({
            timestamp: new Date().toISOString(),
            level: level,
            message: message
        });

        console.log("Log entry created in cosmos db");

    } catch (error) {
        console.log("Error logging in cosmos db : ", error);
    }
}


module.exports = {
    logToCosmosDB
}