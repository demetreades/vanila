'use strict';

const { createServer } = require('node:http');
const createApp = require('./app');
const log = require('./utils/logger');

const runServer = async ({ config, dataService, repo }) => {
  const { port, enviroment, prefix } = config;

  await repo.connect(config);

  const planets = dataService(repo);
  const app = createApp(planets);
  const server = createServer(app);

  server.listen(Number(port), () => {
    log.debug(`homepage: http://localhost:${port}/${prefix}/`);
    log.info(`server listening to port: ${port} in ${enviroment} mode`);
  });

  return server;
};

module.exports = runServer;
