const routes = {
  '/user': {
    use: 'GET',
    responses: [
      {
        status: 200,
        query: {
          id: '10',
        },
        response: {
          id: 10,
          name: 'John',
          email: 'john@my-mail.uk',
        },
      },
      {
        status: 204,
        response: 'User Not Found',
      },
    ],
  },
};

module.exports = routes;
