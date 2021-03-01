const consola = require('consola');
const { QueryTypes } = require('sequelize');
const {
  sqlResultToTimeSeriesLineChart,
} = require('../../utils/TimeSeriesLineChartUtil');
const { sequelize } = require('../../database');
const { Response } = require('../../objects/Response');

module.exports = {
  path: '/api/messages/bar', // ?words=[A-Za-z0-9, ]+&monthly=true|false
  method: 'get',
  middlewares: [],
  readRequest: async (req, res) => {
    if (req.query.words) {
      sequelize
        .query(
          'SELECT PersonId, COUNT(*) as count ' +
            'FROM Messages as m, MessageWords as mw, Words as w ' +
            'WHERE m.id = mw.MessageId AND mw.WordId = w.id AND w.word IN (:words) ' +
            'GROUP BY PersonId ' +
            'ORDER BY PersonId',
          {
            replacements: {
              words: req.query.words.split(','),
            },
            type: QueryTypes.SELECT,
          }
        )
        .then((count) => {
          const result = Array(7);
          count.forEach((entry) => {
            result[entry.PersonId - 1] = entry.count;
          });
          res.status(200).json(new Response(true, result));
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
          'SELECT COUNT(*) as count FROM Messages GROUP BY PersonId ORDER BY Personid',
          {
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          res.status(200).json(
            new Response(
              true,
              result.map((e) => e.count)
            )
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
