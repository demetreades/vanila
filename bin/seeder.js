'use strict';

// simple script for generating random planets data in a json file on project root path

const { fsAsyncUtil } = require('../src/utils');

const randomString = () => (Math.random() + 1).toString(32).substring(7);
const randomNumberRange = (min = 0, max = 100_000) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const seeder = async ({ fileName, size }) => {
  try {
    const planets = [];
    for (let i = 0; i < size; i++) {
      planets[i] = {
        aa: i + 1,
        id: randomNumberRange(100_000, 1_000_000_000),
        code: `${randomString().toUpperCase()}:${randomString().toUpperCase()}`,
        population: randomNumberRange(50, 8_000_000),
        size: randomNumberRange(1_000_000, 999_000_000_000),
      };
    }

    // await fsAsyncUtil.write({ fileName, content: planets });
    await fsAsyncUtil.pipeline({
      fileName,
      content: planets,
    });

    console.log(`json seeder successful: ${planets.length} planets generated!`);
  } catch (err) {
    console.error('json seeder error: ', err);
  }
};

(async (config) => await seeder(config))({
  fileName: 'planets',
  size: randomNumberRange(50, 2_500),
});
