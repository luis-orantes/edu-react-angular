const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

const rentals = [
    {
      _id: '2137129312',
      city: 'New York',
      title: 'Very nice place'
    },
    {
      _id: 'asjkdajdasnda',
      city: 'Berlin',
      title: 'Very nice place as well!'
    },
  ]

app.get('/api/v1/rentals', (req, res) => {
    return res.json(rentals);
})

app.get('/api/v1/rentals/:rentalId', (req, res) => {
    const {rentalId } = req.params;
    const rental = rentals.find(item => item._id === req.params.rentalId);
    return res.json(rental);
})

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})

