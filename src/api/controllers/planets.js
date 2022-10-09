'use strict';

const { successResponse, createPayload, handleAsync } = require('../../utils');

const planetControllers = (planetsService) => ({
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
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const results = await planetsService.getManyByPopulation(body);

      successResponse({
        res,
        type: 'json',
        payload: createPayload({
          data: results,
          body: JSON.parse(body),
        }),
      });

      return results;
    });
  }),
});

module.exports = planetControllers;
