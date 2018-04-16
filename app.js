const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const chalk = require('chalk');

const app = new Koa();
const router = new Router();

let server;
let initialRoutes;
let currentRoutes;

const loadRoutes = (routes) => {
  Object.keys(routes).forEach(path => {
    const config = routes[path];
    router[config.use.toLowerCase()](path, ctx => {
      const response = config.responses.find(({ query = {} }) => {
        let matches = true;
        Object.keys(query).forEach(key => {
          if(query[key] !== ctx.query[key]) {
            matches = false;
          }
        });
        return matches;
      });
      if(response) {
        ctx.status = response.status;
        ctx.body = response.response;
      }
    });
  });
};

const start = (routes, port = 3001) => {
  if (typeof routes !== 'object') {
    console.log(chalk.red('Routes are not a valid json object - exiting.'));
    return;
  }
  app.use(cors({ origin: "*", allowHeaders: "*" }));
  initialRoutes = { ...routes };
  currentRoutes = { ...routes };
  loadRoutes(initialRoutes);
  app.use(router.routes());
  server = app.listen(port);
  console.log(`server listening on port: ${port}`)
};

const stop = () => {
  if (server) {
    server.close();
    server = undefined;
  } else {
    console.log(chalk.yellow('Called `stop` before server was started'));
  }
};

const restore = () => {
  if (typeof initialRoutes !== 'object') {
    console.log(chalk.yellow('Called `restore` before server was started'));
    return;
  }
  router.stack = [];
  loadRoutes(initialRoutes);
};

const add = (routes) => {
  currentRoutes = { ...currentRoutes, ...routes };
  router.stack = [];
  loadRoutes(currentRoutes);
};

module.exports = {
  start,
  stop,
  restore,
  add,
};