#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const commander = require('commander');

const { start, add, restore } = require('./app');

const defaultConfig = 'mock-server.config.js';

commander
  .option('-c, --config [path]', 'Path to mock-server config', defaultConfig)
  .option('-p, --port <n>', 'Port to run the mock server', 3001)
  .parse(process.argv);

const filePath = commander.config || defaultConfig;
let config;

try {
  config = require(path.join(process.cwd(), filePath));
} catch(err) {
  console.log(chalk.red('[ERROR json-mock-server] - Could not resolve path:'), chalk.yellow(`"${path.join(process.cwd(), filePath)}"`));
  if (commander.config === defaultConfig) {
    console.log(chalk.red('Default config file could not be found. To specify a filepath use `--config`'));
  }
  process.exit();
}

start(config, commander.port);
