const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// routes
const config = require('./config/dev');
const rentalRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');

const { userAuth } = require('./controllers/users');
const { dbErrMid } = require('./middlewares');

// models
require('./models/rental');
require('./models/users');
require('./models/bookings');

const app = express();
const PORT = process.env.PORT || 3001;


mongoose.connect(config.DB_URI, () => {
    console.log('Connected to DB!');
})

// Middleware
app.use(bodyParser.json());
app.use(dbErrMid);

// Api Routes
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.get('/api/v1/secret', userAuth, (req, res) => {
    res.send({title: 'Auth', message: `Secret message for ${res.locals.user.username}`});
})

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})
