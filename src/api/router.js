'use strict';

const { pages, planets } = require('./controllers');
const { prefixedEndpoint } = require('../utils');
const { parse } = require('node:url');

const router = async ({ req, res, service }) => {
  const { method, url } = req;
  const { pathname } = parse(url);

  if (pathname === prefixedEndpoint() && method === 'GET') {
    await pages().getHomepage(req, res);

    return;
  }
  if (pathname === prefixedEndpoint('/planets') && method === 'GET') {
    await planets(service).getAll(req, res);

    return;
  }
  if (pathname === prefixedEndpoint('/planet') && method === 'POST') {
    await planets(service).getManyByPopulation(req, res);

    return;
  }

  pages().notFound(req, res);
};

module.exports = router;
