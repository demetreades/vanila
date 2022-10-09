'use strict';

const { writeFile, readFile } = require('fs/promises');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream/promises');
const { Readable } = require('stream');
const log = require('../utils/logger');

const fsAsyncUtil = {
  async write({ content, fileName, encoding = 'utf8', flag = 'w' }) {
    await writeFile(`${fileName}.json`, JSON.stringify(content), {
      encoding,
      flag,
    });
  },
  async read({ fileName, encoding = 'utf-8' }) {
    const file = await readFile(`${fileName}`, { encoding: encoding });

    return file;
  },
  async pipeline({ content, fileName, extention = 'json' }) {
    try {
      const readStream = Readable.from(JSON.stringify(content));
      const writeStream = createWriteStream(`${fileName}.${extention}`);

      await pipeline(readStream, writeStream);
    } catch (err) {
      log.error('pipeline error: ', err);
    }
  },
};

module.exports = fsAsyncUtil;
