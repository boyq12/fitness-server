"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AController_1 = require("../interfaces/AController");
const logger_1 = require("../../libs/logger");
var mockUsers = [{
        id: 3,
        fullname: 'Nguyen Van A',
        birthyear: 1990
    }, {
        id: 6,
        fullname: 'Le Thi B',
        birthyear: 1993
    }];
var logger = new logger_1.Logger();
class User extends AController_1.AController {
    list(req, res) {
        res.send({
            code: 0,
            message: 'success',
            data: mockUsers
        });
        logger.emit(logger_1.LogType.debug, 'short', 'full');
    }
}
const user = new User();
module.exports = user;

//# sourceMappingURL=user.js.map
