const consola = require('consola');
const moment = require('moment');
const { readFileSync } = require('fs');
const { Person } = require('../models/Person');
const { Word } = require('../models/Word');

const MESSAGE_PATTERN = /^\[(?<time>\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\] (?<sender>.*?): (?<message>.*)$/;

// TODO: Fix multi line messages
async function populateDatabase(path) {
    const data = readFileSync(path, 'UTF-8');
    const lines = data.split(/\r?\n/);

    for (const line in lines) {
        const l = lines[line].trim();
        const m = l.match(MESSAGE_PATTERN);

        if (l.indexOf('⬅️') === -1 && m) {
            try {
                let person = await Person.findOne({ where: { name: m.groups.sender } });
                if (!person) {
                    person = await Person.create({ name: m.groups.sender })
                }
                const message = await person.createMessage({ time: moment(m.groups.time, 'DD-MM-YYYY hh:mm:ss') });
                const words = m.groups.message.split(' ');
                
                for (const word in words) {
                    let w = await Word.findOne({ where: { word: words[word] } });
                    if (!w) {
                        w = await Word.create({ word: words[word] });
                    }
                    await message.addWord(w);
                }
            } catch (err) {
                consola.error(err);
                consola.info(`Time: ${m.groups.time} - Sender: ${m.groups.sender} - Message: ${m.groups.message}`);
                throw new Error();
            }
        }
    }
}

module.exports = { populateDatabase };
