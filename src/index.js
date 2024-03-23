const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/server.config');

const apiRouter = require('./routes');
const { pingController } = require('./controllers');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', pingController);

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server started PORT --> ${PORT}`)
})