"use strict";
const schemas_1 = require("../schemas");
const fs = require('fs');
const path = require('path');
const dumpPath = path.join(__dirname, '..', '..', 'dump');
try {
    fs.mkdirSync(dumpPath);
}
catch (e) { }
module.exports = function main() {
    schemas_1.sequelize.sync().then(async (rs) => {
        let keys = Object.keys(schemas_1.sequelize.models);
        if (!keys.length)
            return;
        let NOW = new Date();
        let folderName = NOW.toISOString().substr(0, 19).replace(/:/g, '');
        let folderPath = path.join(dumpPath, folderName);
        fs.mkdirSync(folderPath);
        keys.forEach(async (key) => {
            try {
                let Model = schemas_1.sequelize.models[key];
                let data = await Model.findAll({});
                fs.writeFileSync(path.join(folderPath, key + '.json'), JSON.stringify(data, null, 2));
            }
            catch (e) {
                console.log('::::::::::::');
                console.log(`cannot export "${key}": ${e.message}`);
                console.log('::::::::::::');
            }
        });
    });
};

//# sourceMappingURL=backup.js.map
