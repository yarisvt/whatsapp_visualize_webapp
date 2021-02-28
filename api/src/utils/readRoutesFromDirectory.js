const consola = require("consola");
const { readdirSync, lstatSync } = require("fs");
const { join } = require("path");

function readRoutesFromDirectory(server, directory) {
  const routes = readdirSync(directory);
  routes.forEach((route) => {
    if (lstatSync(join(directory, route)).isDirectory()) {
      readRoutesFromDirectory(server, join(directory, route));
    } else {
      const r = require(join(directory, route));
      server[r.method](r.path, ...r.middlewares, r.readRequest);
      consola.info(`Registered route at ${r.method.toUpperCase()} ${r.path}`);
    }
  });
}

module.exports = { readRoutesFromDirectory };
