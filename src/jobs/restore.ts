import {schemas, sequelize} from "../schemas";
import misc from "libs/misc";
var sequence = require('./sequence');

const fs = require('fs');
const path = require('path');
const order = ['User', 'Muscle', 'Gym'];
const dumpPath = path.join(__dirname,'..', '..', 'dump');

export = async function main() {
  let folderName = getLastestFolder();
  let folderPath = path.join(dumpPath, folderName);
  console.log(`=== Restore from: ${folderPath} ===`);

  let rs = await sequelize.sync({force: true});
  let keys = Object.keys(sequelize.models);
  let tmpKeys = order;
  keys.forEach(key => {
    if (tmpKeys.indexOf(key) == -1) {
      tmpKeys.push(key);
    }
  })
  keys = tmpKeys;
  console.log('keys');
  console.log(keys);
  let files = readFiles(folderPath);

  for (let key of keys) {
    let fileName = key + '.json';
    if (files[fileName]) {
      try {
        let records = JSON.parse(files[fileName]);
        let Model = schemas[key];
        await Model.bulkCreate(records);
        console.log(`Import "${key}" success`);
      } catch (e) {
        console.log('::::::::::::');
        console.log(`cannot restore "${key}": ${e.message}`);
        console.log('::::::::::::');
      }
    }
  }

  await sequence();
}

function getLastestFolder() {
  let folders = fs.readdirSync(dumpPath)
  .filter(file => fs.lstatSync(path.join(dumpPath, file)).isDirectory())
  .sort((a, b) => b > a);
  return folders[0];
}

function readFiles(folderPath) {
  let hash = {};
  let files = fs.readdirSync(folderPath)
  .filter(file => !fs.lstatSync(path.join(folderPath, file)).isDirectory())
  .forEach(file => {
    let txt = fs.readFileSync(path.join(folderPath, file)).toString();
    hash[file] = txt;
  });
  return hash;
}
