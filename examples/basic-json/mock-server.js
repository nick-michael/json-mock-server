const { start } = require('json-mock-server');
const config = require('./example.json');

start(config, 3001);
