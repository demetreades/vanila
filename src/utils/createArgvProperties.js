'use strict';

const createArgvProperties = () => {
  const argvArray = process.argv.slice(2);
  if (!argvArray.length) {
    return;
  }

  const cliArgs = argvArray.map((property) => {
    const [key, value] = property.split('=');

    return {
      [key.toLocaleLowerCase()]: value,
    };
  });

  const cliProperties = cliArgs.reduce((acc, propertyObj) => {
    const [[key, value]] = Object.entries(propertyObj);

    return {
      ...acc,
      [key]: value,
    };
  });

  return cliProperties;
};

module.exports = createArgvProperties;
