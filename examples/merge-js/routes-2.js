const routes = {
  '/update': {
    use: 'POST',
    responses: [
      {
        status: 200,
        response: 'success!',
      },
    ],
  },
};

module.exports = routes;
