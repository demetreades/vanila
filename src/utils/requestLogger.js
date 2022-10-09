'use strict';

const requestLogger = ({ req, res, start }) => {
  res.on('finish', () => {
    const { method, socket, url } = req;
    const { remoteAddress } = socket;
    const { statusCode } = res;

    const timeInMs = new Date().getTime() - start;

    console.log(
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
