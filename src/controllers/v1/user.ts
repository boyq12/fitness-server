import {Request, Response} from "express";
import {AController} from "../interfaces/AController";
import { Logger, LogType } from "../../libs/logger";

var mockUsers = [{
  id: 3,
  fullname: 'Nguyen Van A',
  birthyear: 1990
}, {
  id: 6,
  fullname: 'Le Thi B',
  birthyear: 1993
}];

var logger = new Logger();

class User extends AController {
  list(req: Request, res: Response) {
    res.send({
      code: 0,
      message: 'success',
      data: mockUsers
    });

    logger.emit(LogType.debug, 'short', 'full');
  }
}

const user = new User();
module.exports =  user;
