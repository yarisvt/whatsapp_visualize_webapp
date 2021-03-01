const consola = require('consola');
const { QueryTypes } = require('sequelize');
const { sqlResultToHeatMapSeries } = require('../utils/HeatMapUtils');
const { sequelize } = require('../database');
const { Response } = require('../objects/Response');

module.exports = {
  path: '/api/people/:person/messages', // ?words=[A-Za-z0-9, ]+&monthly=true|false
  method: 'get',
  middlewares: [],
  readRequest: async (req, res) => {
    if (req.query.monthly === 'true') {
      if (req.query.words) {
        sequelize.query('SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, COUNT(*) as count ' +
                                'FROM Messages as m, MessageWords as mw, Words as w ' + 
                                'WHERE m.PersonId = :id AND m.id = mw.MessageId AND mw.WordId = w.id AND w.word IN (:words) ' + 
                                'GROUP BY YEAR(time), MONTH(time)', {
          replacements: {
            id: req.params.person,
            words: req.query.words.split(',')
          },
          type: QueryTypes.SELECT
        }).then((result) => {
          res.status(200).json(new Response(true, sqlResultToHeatMapSeries(result)));
        }).catch((err) => {
          consola.error(err);
          res.status(500).json(new Response(false, 'An error occured quering the data'));
        });
      } else {
        sequelize.query('SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, COUNT(*) as count ' +
                                'FROM Messages WHERE PersonId = :id ' +
                                'GROUP BY YEAR(time), MONTH(time)', { 
          replacements: { 
            id: req.params.person
          }, 
          type: QueryTypes.SELECT 
        }).then((result) => {
          res.status(200).json(new Response(true, sqlResultToHeatMapSeries(result)));
        }).catch((err) => {
          consola.error(err);
          res.status(500).json(new Response(false, 'An error occured quering the data'));
        });
      }
    } else {
      if (req.query.words) {
        sequelize.query('SELECT COUNT(*) as count FROM Messages as m, MessageWords as mw, Words as w ' +
                                'WHERE m.PersonId = :id AND m.id = mw.MessageId AND mw.WordId = w.id AND w.word IN (:words)', {
          replacements: {
            id: req.params.person,
            words: req.query.words.split(',')
          },
          type: QueryTypes.SELECT
        }).then((count) => {
          res.status(200).json(new Response(true, count[0].count));
        }).catch((err) => {
          consola.error(err);
          res.status(500).json(new Response(false, 'An error occured quering the data'));
        });
      } else {
        sequelize.query('SELECT COUNT(*) as count FROM Messages WHERE PersonId = :id', { 
          replacements: { 
            id: req.params.person
          }, 
          type: QueryTypes.SELECT 
        }).then((count) => {
          res.status(200).json(new Response(true, count[0].count));
        }).catch((err) => {
          consola.error(err);
          res.status(500).json(new Response(false, 'An error occured quering the data'));
        });
      }
    }
  }
};
