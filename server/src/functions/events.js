const http = require('http');

const options = { host: 'localhost', port: '3000' };

module.exports.sendInsertEvent = (body) => {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        ...options,
        path: '/meta/tracks',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      },
      (response) => {
        response.on('end', () => {
          resolve(true);
        });
      }
    );
    req.on('error', (err) => reject(err));
    req.end();
  }).catch((err) => console.log(err));
};
