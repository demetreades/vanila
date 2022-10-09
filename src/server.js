'use strict';

const { createServer } = require('node:http');
const { port, enviroment } = require('./config');
const { router } = require('./api');

const runServer = ({ router, port }) => {
  const server = createServer(router);
  server.listen(Number(port), () =>
    console.log(`server listening to port: ${port} in ${enviroment} mode`)
  );

  return server;
};

runServer({
  router,
  port,
});
