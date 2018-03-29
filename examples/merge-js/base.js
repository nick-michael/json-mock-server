const routes1 = require('./routes-1');
const routes2 = require('./routes-2');

const base = {
  ...routes1,
  ...routes2,
};

module.exports = base;