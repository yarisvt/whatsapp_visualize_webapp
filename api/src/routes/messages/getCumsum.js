const consola = require('consola');
const { QueryTypes } = require('sequelize');
const {
  sqlResultToTimeSeriesLineChart,
} = require('../../utils/TimeSeriesLineChartUtil');
const { sequelize } = require('../../database');
const { Response } = require('../../objects/Response');

module.exports = {
  path: '/api/messages/cumsum', // ?words=[A-Za-z0-9, ]+&monthly=true|false
  method: 'get',
  middlewares: [],
  readRequest: async (req, res) => {
    if (req.query.words) {
      sequelize
        .query(
          'SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, COUNT(*) as count, PersonId ' +
            'FROM Messages as m, Words as w, MessageWords as mw ' +
            'WHERE m.id = mw.MessageId AND mw.WordId = w.id AND w.word IN (:words) ' +
            'GROUP BY year, month, PersonId ' +
            'ORDER BY year, month',
          {
            replacements: {
              words: req.query.words.split(','),
            },
            type: QueryTypes.SELECT,
          }
        )
        .then(async (result) => {
          res
            .status(200)
            .json(
              new Response(true, await sqlResultToTimeSeriesLineChart(result, true))
            );
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
          'SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, COUNT(*) as count, PersonId ' +
            'FROM Messages ' +
            'GROUP BY year, month, PersonId ' +
            'ORDER BY year, month',
          {
            type: QueryTypes.SELECT,
          }
        )
        .then(async (result) => {
          res
            .status(200)
            .json(
              new Response(true, await sqlResultToTimeSeriesLineChart(result, true))
            );
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
