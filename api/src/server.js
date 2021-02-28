const express = require("express");
const consola = require("consola");
const cors = require("cors");
const helmet = require("helmet");
const { join } = require("path");

const { sequelize } = require("./database");
require("./models/Word");
require("./models/Person");
require("./models/Message");

const { readRoutesFromDirectory } = require("./utils/readRoutesFromDirectory");

sequelize.sync();

const server = express();

server.use(helmet());
if (process.env.NODE_ENV === "development") {
  server.use(cors());
}

readRoutesFromDirectory(server, join(__dirname, "routes"));

server
  .listen(process.env.PORT, () => {
    consola.success(`Successfully listening on port: ${process.env.PORT}`);
  })
  .on("error", consola.error);
