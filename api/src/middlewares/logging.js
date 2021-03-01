const consola = require('consola');

async function requestLogging(req, res, next) {
  consola.log(req.method + ' ' + req.originalUrl);
  next();
}

module.exports = { requestLogging };
