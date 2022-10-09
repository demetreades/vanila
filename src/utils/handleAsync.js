'use strict';

const handleErrors = require('./handleErrors');

const handleAsync = (middleware) => async (req, res) => {
  try {
    await middleware(req, res);
  } catch (err) {
    handleErrors({
      err,
      res,
    });
  }
};

module.exports = handleAsync;
