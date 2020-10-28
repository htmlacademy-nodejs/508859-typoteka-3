'use strict';

const axios = require(`axios`);

const getRequest = () => {
  return axios.create({
    baseURL: `http://localhost:3000/api/`,
    timeout: 5000,
    withCredentials: true,
    headers: {
      'Content-Type': `application/json`,
      'Accept': `application/json`,
    }
  });
};

module.exports = {
  getRequest
};
