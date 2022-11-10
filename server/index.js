const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/v1/rentals', (req, res) => {
    return res.send('hi');
})

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})

