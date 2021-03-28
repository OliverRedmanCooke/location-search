const express = require('express');
const app = express();
const config = require('./config')
const db = require('./database/db')
const logger = require('morgan');
app.use(logger('dev'));

const searchRouter = require('./routes/search');


app.use('/locations', searchRouter);

const port = config.port || 3000

// Start server
startServer =  async () => {
    try {
        await db.setupDb()

        app.listen( port, () => console.log(`Server listening on port ${port}`));
    }
    catch (err) {
        console.log(err)
    }
};

startServer()