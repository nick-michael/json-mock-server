const { get } = require('axios');

const getUser = (id) => {
  const url = `http://localhost:3003/user?id=${id}`;
  return get(url).then(res => {
    if (res.status === 204) {
      return {};
    }
    return res.data;
  }).catch(err => {
    return err.response;
  });
};

module.exports = {
  getUser,
};