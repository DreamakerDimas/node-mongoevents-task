const http = require('http');
const { titleRegex } = require('../constants');

const options = { host: 'localhost', port: '3000' }; // port: 4000

module.exports.sendInsertEvent = async (body) => {
  return new Promise((resolve, reject) => {
    const req = http.request({
      ...options,
      path: '/meta/tracks', // path: '/test',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    req.write(JSON.stringify(body));

    req.on('error', (err) => reject(err));

    req.on('response', () => {
      resolve(true);
    });

    req.end();
  }).catch((err) => {
    console.log(err);
    return false;
  });
};

module.exports.sendUpdateEvent = async (body) => {
  return new Promise((resolve, reject) => {
    const req = http.request({
      ...options,
      path: '/meta/tracks', // path: '/test',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    req.write(JSON.stringify(body));

    req.on('error', (err) => reject(err));

    req.on('response', () => {
      resolve(true);
    });

    req.end();
  }).catch((err) => {
    console.log(err);
    return false;
  });
};

module.exports.sendDeleteEvent = (id) => {
  return new Promise((resolve, reject) => {
    const req = http.request({
      ...options,
      path: `/meta/tracks/${id}`, // path: '/test/${id}',
      method: 'DELETE',
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.on('response', () => {
      resolve(true);
    });

    req.end();
  }).catch((err) => {
    console.log(err);
    return false;
  });
};

module.exports.titleIsMatches = (title) => title.match(titleRegex);
