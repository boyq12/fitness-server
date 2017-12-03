"use strict";
const schemas_1 = require("../schemas");
module.exports = function main() {
    schemas_1.sequelize.sync({ force: true }).then(async (rs) => {
        Object.keys(schemas_1.schemas).forEach((modelName) => {
            if (typeof schemas_1.schemas[modelName].addFullTextIndex === "function") {
                this.schemas[modelName].addFullTextIndex();
            }
        });
    });
};

//# sourceMappingURL=init_fulltext_search.js.map
