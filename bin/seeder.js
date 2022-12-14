'use strict';

// simple script for generating random planets data in a json file on project root path

const { fsAsyncUtil } = require('../src/utils');
const log = require('../src/utils/logger');

const randomString = () => (Math.random() + 1).toString(32).substring(7);
const randomNumberRange = (min = 0, max = 100_000) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const seeder = async ({ fileName, size }) => {
  try {
    const planets = [];
    for (let i = 0; i < size; i++) {
      const colonized = randomNumberRange(0, 6) ? true : false;

      planets[i] = {
        aa: i + 1,
        id: randomNumberRange(10_000, 1_000_000_000),
        colonized,
        code: `${randomString().toUpperCase()}:${randomString().toUpperCase()}`,
        population: colonized ? randomNumberRange(1, 99_000_000) : 0,
        size: randomNumberRange(10_000, 220_000_000),
      };
    }

    await fsAsyncUtil.pipeline({
      fileName,
      content: planets,
    });

    log.info(`JSON Seeder success: ${planets.length} planets generated!`);
  } catch (err) {
    log.error('JSON Seeder error: ', err);
  }
};

(async (config) => await seeder(config))({
  fileName: 'planets',
  size: randomNumberRange(50, 10_000),
});
