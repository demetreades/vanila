'use strict';

const requestLogger = require('./utils/requestLogger');
const router = require('./api/router');
const handleErrors = require('./utils/handleErrors');

const createApp = (service) => async (req, res) => {
  try {
    requestLogger({
      req,
      res,
      start: new Date().getTime(),
    });

    const routes = await router({
      req,
      res,
      service,
    });

    return routes;
  } catch (err) {
    handleErrors({
      err,
      res,
    });
  }
};

module.exports = createApp;
