
const users = require('../models/users');
const jwt = require('jsonwebtoken');

const config = require('../config/dev');


exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log('hi log: ', req.pru);

  users.findOne({ email }, (error, userExisting) => {
    if(error) {
      return res.status(422).send({error: {title: 'Error in Login', detail: 'Internal DB error'}});
    }
    if(!userExisting) {
      return res.status(422).send({error: {title: 'Error in Login', detail: 'Username not found'}});
      return; // TODO> *** Use this line to avoid crashing the server when username already exists. The controller is invoking twice when this error occurs.
    }

    if(userExisting.passValidate(password)) {
      const token = jwt.sign({
        sub: userExisting._id,
        user: userExisting.username,
      }, config.JWT_SECRET, {expiresIn: '20h'});
      return res.json({ token });
    } else {
      return res.status(422).send({error: {title: 'Error in Login', detail: 'Invalid password'}}); 
    }
  })
}


exports.register = (req, res) => {
  const { username, password, email } = req.body;

  users.findOne({ email }, (error, userExisting) => {
    if(error) {
      return res.status(422).send({error: {title: 'Error in registering', detail: 'Internal DB error'}});
    }
    if(userExisting) {
      return res.status(422).send({error: {title: 'Error in registering', detail: 'Username already exists'}});
    }

    const usernameNew = new users({ username, password, email });

    usernameNew.save((error, userCreated) => {
      if(error) {
        return res.status(422).send({error: {title: 'Error in registering', detail: 'Internal DB error'}});
      }
      return res.json({message: `New username registered with id: ${userCreated._id}`});
    })
  })
}
