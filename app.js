const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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
app.use('/products', product);


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});


