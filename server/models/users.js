
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    minlenght: [4, 'User should be at least 4 chars long'],
    maxlenght: [32, 'User should be at most 32 chars long'],
  },
  email: {
    type: String,
    minlenght: [4, 'Email should be at least 4 chars long'],
    maxlenght: [32, 'Email should be at most 32 chars long'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
  },
  password: {
    type: String,
    required: 'password is required',
    minlenght: [4, 'Password should be at least 4 chars long'],
    maxlenght: [32, 'Password should be at most 32 chars long'],
  }
});


usersSchema.pre('save', function(next) {
  const users = this;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(users.password, salt, (err, hash) => {
      users.password = hash;
      next();
    })
  })

  // using one function is not working, returns DB error
  // bcrypt.hash(users.password, 10, salt, (err, hash) => {
  //   users.password = hash;
  //   next();
  // })

});


usersSchema.methods.passValidate = function(password) {
  return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('users', usersSchema);
