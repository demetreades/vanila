'use strict';

const { parse } = require('node:url');
const { pages, planets } = require('./controllers');
const requestLogger = require('../utils/requestLogger');
const { handleErrors, prefixedEndpoint } = require('../utils');

const router = async (req, res) => {
  try {
    const requestStart = new Date().getTime();
    const { method, url } = req;
    const { pathname } = parse(url);

    requestLogger(req, res, requestStart);

    if (pathname === prefixedEndpoint() && method === 'GET') {
      await pages.getHomepage(req, res);

      return;
    }
    if (pathname === prefixedEndpoint('/planets') && method === 'GET') {
      await planets.getAll(req, res);

      return;
    }
    if (pathname === prefixedEndpoint('/planet') && method === 'POST') {
      await planets.getManyByPopulation(req, res);

      return;
    }

    pages.notFound(req, res);
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = router;
