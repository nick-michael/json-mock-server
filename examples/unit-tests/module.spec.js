const assert = require('assert');
const { start, add, stop, restore } = require('json-mock-server');

const mockRoutes = require('./example.json');
const { getUser } = require('./module');

describe('Get User By Id', () => {
  before(() => {
    start(mockRoutes, 3003);
  });

  after(() => {
    stop();
  });

  beforeEach(() => {
    restore();
  });

  it('should catch and return error object if server fails', () => {
    const errorRoute = {
      '/user': {
        use: "GET",
        responses: [
          {
            status: 500,
            response: 'Internal Server Error',
          },
        ],
      },
    };

    add(errorRoute);

    return getUser(10).then(res => {
      assert.equal(res.status, 500);
      assert.equal(res.statusText, 'Internal Server Error');
    });
  });

  it('should return user object if user exists', () => {
    const expected = {
      id: 10,
      name: 'John',
      email: 'john@my-mail.uk',
    };

    return getUser(10).then(res => {
      assert.deepEqual(res, expected);
    });
  });

  it("should return empty object if user does not exist", () => {
    return getUser(11).then(res => {
      assert.deepEqual(res, {});
    });
  });
});