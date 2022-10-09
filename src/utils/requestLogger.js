'use strict';

const log = require('./logger');

const requestLogger = ({ req, res, start }) => {
  res.on('finish', () => {
    const { method, url } = req;
    const { statusCode } = res;

    const timeInMs = new Date().getTime() - start;

    log.debug(statusCode, method, url, '-', `${timeInMs}ms`);
  });
};

module.exports = requestLogger;
