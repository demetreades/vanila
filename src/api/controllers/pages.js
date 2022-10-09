'use strict';

const { successResponse, fsAsyncUtil } = require('../../utils');
const { BaseError } = require('../../utils/Errors');
const handleAsync = require('../../utils/handleAsync');

const getHomepage = handleAsync(async (req, res) => {
  const html = await fsAsyncUtil.read({
    fileName: './index.html',
  });

  successResponse({
    res,
    contentType: 'html',
    payload: html,
  });
});

const notFound = handleAsync((req, res) => {
  const { url, method } = req;

  throw new BaseError({
    statusCode: 404,
    message: `Endpoint: ${url} [${method}] not found`,
  });
});

module.exports = {
  getHomepage,
  notFound,
};
