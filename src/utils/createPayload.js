'use strict';

const createPayload = ({ data, success = true, ...rest }) => {
  return JSON.stringify({
    success,
    ...(success && { count: data.length }),
    ...rest,
    data,
  });
};

module.exports = createPayload;
