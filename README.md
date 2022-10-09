# Vanilla CRUD

entrypoint: `bin/runServer.js`

no dependencies :P

#### Quickstart

`npm run build` will start the seeder script for creating the `planets.json` file and will run the server on port given in `package.json` `dev` and `start` scripts as cli flags

    {
      "name": "vanila",
      "version": "1.0.0",
      "description": "run in with `npm run build`",
      "main": "bin/runServer.js",
      "scripts": {
        "start": "NODE_ENV=production node bin/runServer PORT=5555 PREFIX=api",
        "build": "rm -rf planets.json && node bin/seeder && npm run dev",
        "dev": "NODE_ENV=development nodemon bin/runServer PORT=5555 PREFIX=api",
        "kill": "kill -9 $(lsof -t -i:5555) && npm run dev"
      },
      "keywords": [],
      "author": "",
      "license": "ISC"
    }
