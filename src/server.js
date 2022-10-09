'use strict';

const { createServer } = require('node:http');
const createApp = require('./app');
const log = require('./utils/logger');

const runServer = async ({ config, dataService, repo }) => {
  const { port, enviroment, prefix } = config;

  const service = await dataService(repo);
  service.connect(config);

  const app = createApp(service);
  const server = createServer(app);
  server.listen(Number(port), () => {
    log.debug(`Homepage: http://localhost:${port}/${prefix}/`);
    log.info(`Server listening on port: ${port} in "${enviroment} mode"`);
  });

  return server;
};

module.exports = runServer;
