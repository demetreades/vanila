'use strict';

const { BaseError } = require('../utils/Errors');

const planetsService = (repo) => {
  return {
    async getAll() {
      const results = await repo.getAll();

      return results;
    },
    async getById(paramId) {
      const results = await repo.getById(paramId);

      if (!results.length) {
        throw new BaseError({
          statusCode: 404,
          message: `planet ${paramId} not found`,
        });
      }

      return results;
    },
    async getManyByPopulation(body) {
      const results = await repo.getManyByPopulation(body);

      if (!results.length) {
        throw new BaseError({
          statusCode: 404,
          message: `No planets found with ${population} population range`,
        });
      }

      return results;
    },
  };
};

module.exports = planetsService;
