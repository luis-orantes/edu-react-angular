const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// routes
const config = require('./config/dev');
const rentalRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');

// models
require('./models/rental');
require('./models/users');

const app = express();
const PORT = process.env.PORT || 3001;


mongoose.connect(config.DB_URI, () => {
    console.log('Connected to DB!');
})

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('hi');
    const isError = false;
    if(!isError) {
        req.pru = 'mid prob';
        return next();
    }
    return res.status(422).send('middle Error');
});

// Api Routes
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', usersRoutes);

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})
