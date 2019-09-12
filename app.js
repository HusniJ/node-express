const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const winston = require('winston');
const mongoose = require('mongoose');
const connect = require('connect');
const product = require('./routes/product.route'); // Imports routes for the products

// Initialize the express app
const app = express();
let port = 3200;

// Initialize the Database
let dev_db_url = 'mongodb+srv://test:test123@cluster0-m3yfb.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(expressWinston.logger({
    transports: [
      new winston.transports.File({
        filename: 'app.log',
        timestamp: true,
        json: false
      })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  }));
app.use('/products', product);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});


