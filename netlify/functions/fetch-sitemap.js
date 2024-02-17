// netlify/functions/fetch-sitemap.js
const https = require('https');

exports.handler = async (event) => {
  const { url } = event.queryStringParameters;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: 200,
          body: data,
          headers: {
            'Content-Type': 'text/xml',
          },
        });
      });

    }).on('error', (e) => {
      reject({
        statusCode: 500,
        body: "Error fetching the sitemap",
      });
    });
  });
};
