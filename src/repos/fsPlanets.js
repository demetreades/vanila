'use strict';

const { stat } = require('node:fs/promises');
const { BaseError } = require('../utils/Errors');
const log = require('../utils/logger');

let planets;
const connect = async ({ dataFileName }) => {
  try {
    await stat(`./${dataFileName}.json`);
    planets = require(`../../${dataFileName}.json`);
  } catch (err) {
    log.warn('WARN: no planets json data! run build script');
    planets = [];
  }
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(planets);
    } catch (err) {
      log.error(err);

      reject(err);
    }
  });
};

const getById = async (id) => {
  const allPlanets = await getAll();
  const planet = allPlanets.find((planet) => planet.id === id);

  return planet;
};

const getManyByPopulation = async (body) => {
  const { population } = JSON.parse(body);
  const allPlanets = await getAll();

  const filteredPlanets = allPlanets.filter(
    (planet) => planet.colonized && planet.population < Number(population ?? 0)
  );

  return filteredPlanets;
};

module.exports = {
  connect,
  getAll,
  getById,
  getManyByPopulation,
};
