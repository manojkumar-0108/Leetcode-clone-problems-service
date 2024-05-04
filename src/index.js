const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/server.config');
const apiRouter = require('./routes');
const { PingCheck } = require('./controllers');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/ping', PingCheck('API is live...'));


app.use('/api', apiRouter);

//last middle ware to handle errors
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started PORT --> ${PORT}`)
})