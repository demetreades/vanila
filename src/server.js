'use strict';

const { createServer } = require('node:http');
const config = require('./config');
const createApp = require('./app');
const planetsService = require('./services/planets');
const fsPlanetsRepo = require('./repos/fsPlanets');

const runServer = async ({ config, dataService, repo }) => {
  const { port, enviroment } = config;

  await repo.connect(config);

  const planets = dataService(repo);
  const app = createApp(planets);
  const server = createServer(app);

  server.listen(Number(port), () =>
    console.log(`server listening to port: ${port} in ${enviroment} mode`)
  );

  return server;
};

runServer({
  config,
  dataService: planetsService,
  repo: fsPlanetsRepo,
});
