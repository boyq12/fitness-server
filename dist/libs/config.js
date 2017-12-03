"use strict";
var fs = require('fs');
var path = require('path');
var configFile = process.env.CONFIG || path.join(__dirname, '../config.json');
const config = JSON.parse(fs.readFileSync(configFile));
module.exports = config;

//# sourceMappingURL=config.js.map
