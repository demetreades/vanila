'use strict';

const service = require('../../services/planets');
const repo = require('../../repos/planets');
const {
  successResponse,
  createQueryParams,
  createPayload,
  handleAsync,
} = require('../../utils');

const planetsService = service(repo);

const getAll = handleAsync(async (req, res) => {
  const results = await planetsService.getAll();

  successResponse({
    res,
    type: 'json',
    payload: createPayload({
      data: results,
    }),
  });
});

const getPlanetById = handleAsync(async (req, res) => {
  const paramId = 1; // ?????
  const planet = await planetsService.getById(paramId);

  successResponse({
    res,
    type: 'json',
    payload: createPayload({
      data: planet,
    }),
  });
});

const getManyByPopulation = handleAsync(async (req, res) => {
  const { population } = createQueryParams(req);
  const results = await planetsService.getManyByPopulation(population);

  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    successResponse({
      res,
      type: 'json',
      payload: createPayload({
        data: results,
        body: JSON.parse(body),
      }),
    });
  });

  return results;
});

module.exports = {
  getAll,
  getPlanetById,
  getManyByPopulation,
};
