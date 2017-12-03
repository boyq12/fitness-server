"use strict";
const schemas_1 = require("../schemas");
module.exports = async function main() {
    for (let table in schemas_1.sequelize.models) {
        try {
            if (!schemas_1.schemas[table])
                continue;
            let record = await schemas_1.schemas[table].findAll({
                limit: 1,
                order: [['id', 'DESC']],
                attributes: ['id']
            });
            if (record && record.count()) {
                let item = record[0].toJSON();
                let sequence = parseInt(item.id) + 1;
                console.log("sequence :: ", sequence);
                if (table == 'Branch')
                    table = 'Branche';
                if (table == 'ProductCategory')
                    table = 'ProductCategorie';
                await schemas_1.sequelize.query(`ALTER SEQUENCE "${table}s_id_seq" RESTART WITH ${sequence}`);
            }
        }
        catch (e) {
            console.log("Not Found Table :: ", table);
            console.error(e.stack);
        }
    }
};

//# sourceMappingURL=sequence.js.map
