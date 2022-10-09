'use strict';

const successResponse = ({ res, payload, status = 200, contentType }) => {
  const types = {
    html: 'text/html; charset=utf-8',
    json: 'application/json; charset=utf-8',
  };

  res.writeHead(status, {
    'Content-Type': types[contentType] ?? contentType ?? types.json,
    'Content-Length': payload.length,
  });

  res.end(payload);
};

module.exports = successResponse;
