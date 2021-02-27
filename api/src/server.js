const express = require('express');
const consola = require('consola');
const cors = require('cors');
const helmet = require('helmet');
const { readdirSync } = require('fs');
const { join } = require('path');

const { sequelize } = require('./database');
require('./models/Word');
require('./models/Person')
require('./models/Message');
sequelize.sync();

const server = express();

server.use(helmet());
if (process.env.development) {
    server.use(cors());
}

const routes = readdirSync(join(__dirname, 'routes'));
routes.forEach(route => {
    const r = require(join(__dirname, 'routes', route));
    server[r.method](r.path, ...r.middlewares, r.readRequest);
    consola.info(`Registered route at ${r.method.toUpperCase()} ${r.path}`);
});

server.listen(process.env.PORT, () => {
    consola.success(`Successfully listening on port: ${process.env.PORT}`);
}).on('error', consola.error);
