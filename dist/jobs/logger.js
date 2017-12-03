"use strict";
const logger_1 = require("../libs/logger");
module.exports = async function () {
    var logger = new logger_1.Logger({
        graylogPort: 12201
    });
    for (let i = 0; i < 10; i++) {
        logger.emit(logger_1.LogType.debug, 'message #' + i);
    }
};

//# sourceMappingURL=logger.js.map
