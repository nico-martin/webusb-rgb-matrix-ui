require('dotenv').config();

const fs = require('fs');
const server = require('./server');

const serverInstance = server({
  port: process.env.PORT || 8644,
  sslKey: fs.readFileSync(process.env.SSL_KEY),
  sslCert: fs.readFileSync(process.env.SSL_CRT),
});

serverInstance.start();
