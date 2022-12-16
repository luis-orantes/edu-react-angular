

const { rentals, usersData } = require('./data');
const Rental = require('../models/rental');
const users = require('../models/users');


class FakeDB {

  async clean() {
    await Rental.deleteMany({});
    await users.deleteMany({});
  }

  async addData() {
    await Rental.create(rentals);
    await users.create(usersData);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }




}

module.exports = FakeDB;
