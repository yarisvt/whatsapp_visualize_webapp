const consola = require('consola');
const moment = require('moment');
const { readFileSync } = require('fs');
const { Person } = require('../models/Person');
const { Word } = require('../models/Word');

const MESSAGE_PATTERN = /^\u200e?\[(?<time>\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\] (?<sender>.*?): (?<message>.*)$/;
const WORD_PATTERN = /[0-9\p{L}\p{M}-]+/gu;
const EMOJI_PATTERN = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
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
      let words = [];
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
            words.push('!img');
          } else if (l.indexOf('GIF weggelaten') !== -1) {
            words.push('!gif');
          } else if (l.indexOf('video weggelaten') !== -1) {
            words.push('!vid');
          } else if (l.indexOf('document weggelaten') !== -1) {
            words.push('!doc');
          } else if (l.indexOf('sticker weggelaten') !== -1) {
            words.push('!stk');
          }
        } else {
          let msg = m.groups.message.toLowerCase();
          // Report each URL
          const urls = msg.match(URL_PATTERN);
          if (urls) {
            for (let i = 0; i < urls.length; i++) {
              words.push('!url');
            }
            msg = msg.replace(URL_PATTERN, '');
          }

          // Get words and emojis
          words = words.concat(msg.match(WORD_PATTERN));
          words = words.concat(msg.match(EMOJI_PATTERN));
        }
      } else {
        // e.g. group foto changed
        if (l.indexOf('\u200e') !== -1) {
          continue;
        }

        let msg = l.toLowerCase();
        // Report each URL
        const urls = msg.match(URL_PATTERN);
        if (Boolean(urls)) {
          for (let i = 0; i < urls.length; i++) {
            words.push('!url');
          }
          msg = msg.replace(URL_PATTERN, '');
        }

        // Get words and emojis
        words = words.concat(msg.match(WORD_PATTERN));
        words = words.concat(msg.match(EMOJI_PATTERN));
      }
      
      for (const word in words) {
        if (!Boolean(words[word])) {
          continue;
        }
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
