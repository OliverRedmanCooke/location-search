const express = require('express');
const app = express();
const config = require('./config')
const db = require('./database/db')
const logger = require('morgan');
app.use(logger('dev'));

const searchRouter = require('./routes/search');

// Access Headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
  

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