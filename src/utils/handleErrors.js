'use strict';

const handleErrors = ({ err = null, res, status = 500, message = null }) => {
  const statusCode = err?.statusCode ?? status;
  const errorMsg = err?.message ?? message ?? 'err obj is null';

  console.error('ERROR LOG: ', statusCode, errorMsg);

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

module.exports = handleErrors;
