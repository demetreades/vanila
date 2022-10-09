'use strict';

const { join } = require('node:path');
const { prefix } = require('../config');

const prefixedEndpoint = (endpoint = '/') =>
  join('/', prefix, endpoint.startsWith('/') ? endpoint : `/${endpoint}`);

module.exports = prefixedEndpoint;
