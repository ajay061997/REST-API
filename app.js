const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// MongoDB URI
const MONGODB_URI = process.env.mongourl;


const app = express();

// Use body-parser
app.use(bodyParser.json());

// Requre Routes
const employeeRoutes = require('./routes/employee');

// SETUP and Handling Cross-origin resource sharing(CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Using Routes
app.use(employeeRoutes);

// Error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

// connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        app.listen(process.env.PORT || 3000);
        console.log('connected');
    })
    .catch((err) => {
        console.log(err);
    })