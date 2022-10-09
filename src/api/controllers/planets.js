'use strict';

const {
  successResponse,
  createQueryParams,
  createPayload,
  handleAsync,
} = require('../../utils');

const planetControllers = (planetsService) => {
  return {
    getAll: handleAsync(async (req, res) => {
      const results = await planetsService.getAll();

      successResponse({
        res,
        type: 'json',
        payload: createPayload({
          data: results,
        }),
      });
    }),

    getPlanetById: handleAsync(async (req, res) => {
      const paramId = 1; // ?????
      const planet = await planetsService.getById(paramId);

      successResponse({
        res,
        type: 'json',
        payload: createPayload({
          data: planet,
        }),
      });
    }),

    getManyByPopulation: handleAsync(async (req, res) => {
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
    }),
  };
};

module.exports = planetControllers;
