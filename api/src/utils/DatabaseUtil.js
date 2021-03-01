const consola = require("consola");
const moment = require("moment");
const { readFileSync } = require("fs");
const { Person } = require("../models/Person");
const { Word } = require("../models/Word");

const MESSAGE_PATTERN = /^\u200e?\[(?<time>\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\] (?<sender>.*?): (?<message>.*)$/;
const REPLACE_PATTERN = /[!,."'`?()]+/g;
const SPLIT_PATTERN = /[\s/\\;:]+/g;
const URL_PATTERN = /(^|\s)https?:\/\/.*?($|\s)/g;

const people = new Map();

async function populateDatabase(path) {
  const data = readFileSync(path, 'UTF-8');
  const lines = data.split(/\r?\n/);

  let person;
  let message;

  for (const line in lines) {
    const l = lines[line].trim();
    let m;

    if (l.indexOf('⬅️') !== -1) {
      continue; 
    }

    try {
      let words;
      if (m = l.match(MESSAGE_PATTERN)) {
        // Check if sender was cached
        person = people.get(m.groups.sender);
        if (!person) {
          // Check if sender was already in db
          person = await Person.findOne({ where: { name: m.groups.sender } });
          if (!person) {
            // Create sender
            person = await Person.create({ name: m.groups.sender });
          }
          // Cache sender
          people.set(m.groups.sender, person);
        }
        message = await person.createMessage({ time: moment(m.groups.time, 'DD-MM-YYYY hh:mm:ss') });
        // Replace media for queries
        if (l.indexOf('\u200e') !== -1) {
          if (l.indexOf('afbeelding weggelaten') !== -1) {
            words = ['!pic'];
          } else if (l.indexOf('GIF weggelaten') !== -1) {
            words = ['!gif'];
          } else if (l.indexOf('video weggelaten') !== -1) {
            words = ['!vid'];
          } else if (l.indexOf('document weggelaten') !== -1) {
            words = ['!doc'];
          }
        } else {
          words = m.groups.message.toLowerCase().replace(REPLACE_PATTERN, '').replace(URL_PATTERN, ' !url ').split(SPLIT_PATTERN);
        }
      } else {
        words = l.toLowerCase().replace(REPLACE_PATTERN, '').replace(URL_PATTERN, ' !url ').split(SPLIT_PATTERN);
      }

      for (const word in words) {
        const wo = words[word].trim();
        // i.e. empty string
        if (!Boolean(wo)) {
          continue; 
        }

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
