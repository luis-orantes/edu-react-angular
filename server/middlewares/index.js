
exports.dbErrMid = (req, res, next) => {
  res.dbErr = err => {
    const result = [];
    const prop = 'errors';

    if(err && prop in err && err.name === "ValidationError") {
      const errMsg = err[prop];
      for(let key in errMsg) {
        result.push({key: errMsg[key].message});
      }
    } else {
      return res.status(422).send({title: "dbErr", msg: "Error in dbErr"});
    }

    return res.status(422).send({err: result});
  }

  next();
}
