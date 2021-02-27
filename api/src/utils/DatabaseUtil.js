const consola = require('consola');
const moment = require('moment');
const { readFileSync } = require('fs');
const { Person } = require('../models/Person');
const { Word } = require('../models/Word');

const MESSAGE_PATTERN = /^\[(?<time>\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\] (?<sender>.*?): (?<message>.*)$/;

async function populateDatabase(path) {
    const data = readFileSync(path, 'UTF-8');
    const lines = data.split(/\r?\n/);

    let person;
    let message;

    for (const line in lines) {
        const l = lines[line].trim();
        let m;

        if (l.indexOf('⬅️') !== -1 || l.indexOf('\u200e') !== -1) continue;

        try {
            let words;
            if (m = l.match(MESSAGE_PATTERN)) {
                person = await Person.findOne({ where: { name: m.groups.sender } });
                if (!person) {
                    person = await Person.create({ name: m.groups.sender });
                }
                message = await person.createMessage({ time: moment(m.groups.time, 'DD-MM-YYYY hh:mm:ss') });
                words = m.groups.message.split(/[\s,]+/);
            } else {
                words = l.split(/[\s,]+/);
            }

            for (const word in words) {
                const wo = words[word].trim();
                // i.e. empty string
                if (!Boolean(wo)) continue;

                let w = await Word.findOne({ where: { word: wo } });
                if (!w) {
                    w = await Word.create({ word: wo });
                }
                await message.addWord(w);
            }
        } catch (err) {
            consola.error(err);
            consola.info(l);
            throw new Error();
        }
    }
}

module.exports = { populateDatabase };
