const consola = require('consola');
const { QueryTypes } = require('sequelize');
const {
  sqlResultToTimeSeriesLineChart,
} = require('../../utils/TimeSeriesLineChartUtil');
const { sequelize } = require('../../database');
const { Response } = require('../../objects/Response');

module.exports = {
  path: '/api/messages/line', // ?words=[A-Za-z0-9, ]+&monthly=true|false
  method: 'get',
  middlewares: [],
  readRequest: async (req, res) => {
    if (req.query.words) {
      sequelize
        .query(
          'SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, name, COUNT(*) as count ' +
            'FROM Messages as m, People as p, Words as w, MessageWords as mw ' +
            'WHERE p.id = m.PersonId AND m.id = mw.MessageId AND mw.WordId = w.id AND w.word IN (:words) ' +
            'GROUP BY year, month, PersonId ' +
            'ORDER BY year, month, PersonId',
          {
            replacements: {
              words: req.query.words.split(','),
            },
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          res
            .status(200)
            .json(new Response(true, sqlResultToTimeSeriesLineChart(result)));
        })
        .catch((err) => {
          consola.error(err);
          res
            .status(500)
            .json(new Response(false, 'An error occured quering the data'));
        });
    } else {
      sequelize
        .query(
          'SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, name, COUNT(*) as count ' +
            'FROM Messages, People ' +
            'WHERE People.id = Messages.PersonId ' +
            'GROUP BY year, month, PersonId ' +
            'ORDER BY year, month, PersonId',
          {
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          res
            .status(200)
            .json(new Response(true, sqlResultToTimeSeriesLineChart(result)));
        })
        .catch((err) => {
          consola.error(err);
          res
            .status(500)
            .json(new Response(false, 'An error occured quering the data'));
        });
    }
  },
};
