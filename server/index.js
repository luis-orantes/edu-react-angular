const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const rentalRoutes = require('./routes/rentals');
const { mongoUri } = require('./pass/mongo');

const app = express();
const PORT = process.env.PORT || 3001;


mongoose.connect(mongoUri, () => {
    console.log('Connected to DB!');
})

// Middleware
app.use(bodyParser.json());

// Api Routes
app.use('/api/v1/rentals', rentalRoutes);

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})
