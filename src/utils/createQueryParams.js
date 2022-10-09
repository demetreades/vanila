'use strict';

const { parse, URLSearchParams } = require('node:url');

const createQueryParams = (req) => {
  const { query } = parse(req.url);
  const params = new URLSearchParams(query);
  const paramsArray = [...params.entries()];
  const queryObj = paramsArray
    .map(([key, value]) => ({
      [key]: value,
    }))
    .reduce((acc, obj) => ({
      ...acc,
      ...obj,
    }));

  return queryObj ? queryObj : null;
};

module.exports = createQueryParams;
