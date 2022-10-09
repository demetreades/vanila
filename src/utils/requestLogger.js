'use strict';

const log = require('./logger');

const requestLogger = ({ req, res, start }) => {
  res.on('finish', () => {
    const { method, socket, url } = req;
    const { remoteAddress } = socket;
    const { statusCode } = res;

    const timeInMs = new Date().getTime() - start;

    log.info(
      statusCode,
      method,
      url,
      ' - ',
      `${timeInMs}ms`,
      ' , ',
      remoteAddress
    );
  });
};

module.exports = requestLogger;
