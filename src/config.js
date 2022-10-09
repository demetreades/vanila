'use strict';

const createArgvProperties = require('./utils/createArgvProperties');

const enviroment = process.env.NODE_ENV;
const defaultConfig = {
  enviroment,
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
