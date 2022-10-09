'use strict';

const zeroFix = (digit) => (!digit.toString()[1] ? `0${digit}` : digit);

const getTimestamp = (dateObj = new Date()) => {
  const day = zeroFix(dateObj.getDate());
  const month = zeroFix(dateObj.getMonth() + 1);
  const fullYear = zeroFix(dateObj.getFullYear());
  const hours = zeroFix(dateObj.getHours());
  const minutes = zeroFix(dateObj.getMinutes());
  const seconds = zeroFix(dateObj.getSeconds());

  return `[${fullYear}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
};

const config = require('../config');

const createLogger = ({ isProduction }) => ({
  debug: isProduction
    ? () => false
    : (...args) => console.log(getTimestamp(), '[DEBUG]', ...args),
  info: (...args) => console.log(getTimestamp(), '[INFO]', ...args),
  warn: (...args) => console.warn(getTimestamp(), '[WARN]', ...args),
  error: (...args) => console.error(getTimestamp(), '[ERROR]', ...args),
  fatal: (...args) => console.error(getTimestamp(), '[FATAL]', ...args),
});

module.exports = createLogger(config);
