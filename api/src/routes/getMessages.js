const consola = require('consola');
const { QueryTypes } = require('sequelize');
const { sqlResultToTimeSeriesLineChart } = require('../utils/TimeSeriesLineChartUtil');
const { sequelize } = require('../database');
const { Response } = require('../objects/Response');

module.exports = {
    path: '/api/messages', // ?words=[A-Za-z0-9, ]+&monthly=true|false
    method: 'get',
    middlewares: [],
    readRequest: async (req, res) => {  
        if (req.query.monthly === 'true' && req.query.cumsum === 'true') {
            if (req.query.words) {
                if (req.query.words) {
                    sequelize.query('SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, name, COUNT(*) as count, SUM(count(p.id)) OVER (PARTITION BY name ORDER BY YEAR(time), MONTH(time)) AS cumsum ' +
                                    'FROM Messages as m, People as p, Words as w, MessageWords as mw ' +
                                    'WHERE p.id = m.PersonId AND m.id = mw.MessageId AND mw.WordId = w.id AND w.word IN (:words) ' +
                                    'GROUP BY PersonId, YEAR(time), MONTH(time)', { 
                        replacements: {
                            words: req.query.words.split(',')
                        },
                        type: QueryTypes.SELECT
                    }).then((result) => {
                        res.status(200).json(new Response(true, sqlResultToTimeSeriesLineChart(result)));
                    }).catch((err) => {
                        consola.error(err);
                        res.status(500).json(new Response(false, 'An error occured quering the data'));
                    });
            }
            }
        }     
        else if (req.query.monthly === 'true') {
            if (req.query.words) {
                sequelize.query('SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, name, COUNT(*) as count ' +
                                'FROM Messages as m, People as p, Words as w, MessageWords as mw ' +
                                'WHERE p.id = m.PersonId AND m.id = mw.MessageId AND mw.WordId = w.id AND w.word IN (:words) ' +
                                'GROUP BY PersonId, YEAR(time), MONTH(time)', { 
                    replacements: {
                        words: req.query.words.split(',')
                    },
                    type: QueryTypes.SELECT
                }).then((result) => {
                    res.status(200).json(new Response(true, sqlResultToTimeSeriesLineChart(result)));
                }).catch((err) => {
                    consola.error(err);
                    res.status(500).json(new Response(false, 'An error occured quering the data'));
                });
            } else {
                sequelize.query('SELECT DATE_FORMAT(time, \'%Y\') AS year, DATE_FORMAT(time, \'%c\') AS month, name, COUNT(*) as count ' +
                                'FROM Messages, People ' +
                                'WHERE People.id = Messages.PersonId ' +
                                'GROUP BY PersonId, YEAR(time), MONTH(time)', { 
                    type: QueryTypes.SELECT 
                }).then((result) => {
                    res.status(200).json(new Response(true, sqlResultToTimeSeriesLineChart(result)));
                }).catch((err) => {
                    consola.error(err);
                    res.status(500).json(new Response(false, 'An error occured quering the data'));
                });
            }
        } else {
            if (req.query.words) {
                sequelize.query('SELECT PersonId, COUNT(*) as count ' +
                                'FROM Messages as m, MessageWords as mw, Words as w ' +
                                'WHERE m.id = mw.MessageId AND mw.WordId = w.id AND w.word IN (:words) ' +
                                'GROUP BY PersonId', {
                    replacements: {
                        words: req.query.words.split(',')
                    },
                    type: QueryTypes.SELECT
                }).then((count) => {
                    const result = Array(7);
                    count.forEach(entry => {
                        result[entry.PersonId - 1] = entry.count;
                    });
                    res.status(200).json(new Response(true, result));
                }).catch((err) => {
                    consola.error(err);
                    res.status(500).json(new Response(false, 'An error occured quering the data'));
                });
            } else {
                sequelize.query('SELECT COUNT(*) as count FROM Messages GROUP BY PersonId', { 
                    type: QueryTypes.SELECT 
                }).then((result) => {
                    res.status(200).json(new Response(true, result.map(e => e.count)));
                }).catch((err) => {
                    consola.error(err);
                    res.status(500).json(new Response(false, 'An error occured quering the data'));
                });
            }
        }
    }
}