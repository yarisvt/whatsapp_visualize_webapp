const consola = require('consola');
const { Person } = require('../models/Person');
const { Response } = require('../objects/Response');

module.exports = {
    path: '/api/people',
    method: 'get',
    middlewares: [],
    readRequest: async (req, res) => {
        Person.findAll().then((people) => {
            res.status(200).json(new Response(true, people));
        }).catch((err) => {
            consola.error(err);
            res.status(500).json(new Response(false, 'An error occured while fetching people'));
        });
    }
}