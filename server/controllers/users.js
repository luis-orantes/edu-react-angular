
const users = require('../models/users');

exports.login = (req, res) => {
  return res.json({message: 'Login API working!'});
}


exports.register = (req, res) => {
  const { username, password, email } = req.body;

  users.findOne({ email }, (error, userExisting) => {
    if(error) {
      return res.status(422).send({error: {title: 'Error in registering', detail: 'Internal DB error'}});
    }
    if(userExisting) {
      return res.status(422).send({error: {title: 'Error in registering', detail: 'Username already exists'}});
      return; // TODO> *** Use this line to avoid crashing the server when username already exists. The controller is invoking twice when this error occurs.
    }
  })

  const usernameNew = new users({ username, password, email });

  usernameNew.save((error, userCreated) => {
    if(error) {
      return res.status(422).send({error: {title: 'Error in registering', detail: 'Internal DB error'}});
    }
    return res.json({message: `New username registered with id: ${userCreated._id}`});
  })

}
