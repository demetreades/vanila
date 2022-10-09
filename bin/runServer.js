'use strict';

const runServer = require('../src/server');
const planetsService = require('../src/services/planets');
const fsPlanetsRepo = require('../src/repos/fsPlanets');
const config = require('../src/config');

runServer({
  config,
  dataService: planetsService,
  repo: fsPlanetsRepo,
});

process.on('SIGINT', () => {
  console.log('\nbye bye');
  process.exit(0);
});
