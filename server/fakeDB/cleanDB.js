

const mongoose = require('mongoose');

const config = require('../config/dev');
const FakeDB = require('./FakeDB');


mongoose.connect(config.DB_URI, async () => {
  console.log('Starting populating DB');

  const fakeDB = new FakeDB();
  await fakeDB.populate();
  await mongoose.connection.close();

  console.log('DB has been populated!');
})

