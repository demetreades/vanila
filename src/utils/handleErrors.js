'use strict';

const log = require('./logger');

const handleErrors = ({ err = null, res, status = 500, message = null }) => {
  const statusCode = err?.statusCode ?? status;
  const errorMsg = err?.message ?? message ?? 'err obj is null';

  log.error(statusCode, errorMsg);

  const errorData = JSON.stringify({
    success: false,
    message: errorMsg,
  });

  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': errorData.length,
  });

  res.end(errorData);
};

process.on('uncaughtException', (err, origin) => {
  log.error('Uncaught Exceptions at: ', origin, 'error: ', err);
  process.exit(1); // force close server with error
});

process.on('unhandledRejection', (reason, promise) => {
  log.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // force close server with error
});

module.exports = handleErrors;
