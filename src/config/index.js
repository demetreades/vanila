'use strict';

const createArgvProperties = require('../utils/createArgvProperties');

const enviroment = process.env.NODE_ENV || 'development';
const defaultConfig = {
  enviroment,
  fileName: 'planets',
  ...createArgvProperties(),
};

const config = {
  development: {
    ...defaultConfig,
  },
  testing: {
    ...defaultConfig,
  },
  staging: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  },
};

module.exports = config[enviroment];
