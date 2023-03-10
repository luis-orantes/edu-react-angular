
const mongoose = require('mongoose');

const userId1 = mongoose.Types.ObjectId();
const userId2 = mongoose.Types.ObjectId();

exports.usersData = [
  {
    _id: userId1,
    username: 'user1',
    email: 'a1@b.com',
    password: '1234',
  },
  {
    _id: userId2,
    username: 'user2',
    email: 'a2@b.com',
    password: '1234',
  },
]

exports.rentals = [
  {
    title: 'Central Apartment',
    city: 'New York',
    street: 'Time Square',
    category: 'apartment',
    image: 'http://via.placeholder.com/320x250',
    numOfRooms: 3,
    description: 'Very nice apartment',
    dailyPrice: 34,
    shared: false,
    owner: userId1,
  },
  {
    title: 'Central Apartment 2',
    city: 'San Francisco',
    street: 'Main street',
    category: 'condo',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 2,
    description: 'Very nice apartment',
    dailyPrice: 12,
    shared: true,
    owner: userId1,
  },
  {
    title: 'Central Apartment 3',
    city: 'Bratislava',
    street: 'Hlavna',
    category: 'condo',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 2,
    description: 'Very nice apartment',
    dailyPrice: 334,
    shared: true,
    owner: userId2,
  },
  {
    title: 'Central Apartment 4',
    city: 'Berlin',
    street: 'Haupt strasse',
    category: 'house',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 9,
    description: 'Very nice apartment',
    dailyPrice: 33,
    shared: true,
    owner: userId2,
  }];
