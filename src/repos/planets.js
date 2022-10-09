const planets = require('../../planets.json');

const getAll = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(planets);
    } catch (err) {
      console.error(err);

      reject(err);
    }
  });
};

const getById = async (id) => {
  const allPlanets = await getAll();
  const planet = allPlanets.find((planet) => planet.id === id);

  return planet;
};

const getManyByPopulation = async (population) => {
  const allPlanets = await getAll();

  const filteredPlanets = allPlanets.filter(
    (planet) => planet.population < Number(population ?? 0)
  );

  return filteredPlanets;
};

module.exports = {
  getAll,
  getById,
  getManyByPopulation,
};
