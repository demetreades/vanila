'use strict';

const { parse } = require('node:url');
const requestLogger = require('./utils/requestLogger');
const router = require('./api/router');
const handleErrors = require('./utils/handleErrors');

const createApp = (service) => async (req, res) => {
  try {
    const requestStart = new Date().getTime();
    const { method, url } = req;
    const { pathname } = parse(url);

    const routes = await router({
      req,
      res,
      service,
      method,
      pathname,
    });

    requestLogger(req, res, requestStart);

    return routes;
  } catch (err) {
    handleErrors({ err, res });
  }
};

module.exports = createApp;
