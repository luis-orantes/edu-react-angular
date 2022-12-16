
const users = require('../models/users');
const jwt = require('jsonwebtoken');

const config = require('../config/dev');


exports.login = (req, res) => {
  const { email, password } = req.body;

  users.findOne({ email }, (error, userExisting) => {
    if(error) {
      return res.dbErr(error);
    }
    if(!userExisting) {
      return res.status(422).send({error: {title: 'Error in Login', detail: 'Username not found'}});
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
      return res.dbErr(error);
    }
    if(userExisting) {
      return res.status(422).send({error: {title: 'Error in registering', detail: 'Username already exists'}});
    }

    const usernameNew = new users({ username, password, email });

    usernameNew.save((error, userCreated) => {
      if(error) {
        return res.dbErr(error);
      }
      return res.json({message: `New username registered with id: ${userCreated._id}`});
    })
  })
}


exports.userAuth = (req, res, next) => {
  const token = req.headers.auth;

  if(token) {
    const tokenDecoded = tokenParse(token);

    if(!tokenDecoded) {
      return userAuthNo(res);
    }

    users.findById(tokenDecoded.sub, (error, userExisting) => {
      if(error) {
        return res.dbErr(error);
      }
      if(userExisting) {
        res.locals.user = userExisting;
        next();
      } else {
        return res.status(401).send({title: 'Auth', message: 'Not authorized, valid token but user not found'});
      }
    })

  } else {
    return userAuthNo(res);
  }
}


function userAuthNo(res) {
  return res.status(401).send({title: 'Auth', message: 'Not authorized, login first'});
}


function tokenParse(token) {
  try {
    return jwt.verify(token.split(' ')[1], config.JWT_SECRET) || null;
  } catch(err) {
    return null;
  }
}