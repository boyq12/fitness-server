import {Logger, LogType} from "../libs/logger";

export = async function () {
  var logger = new Logger({
    graylogPort: 12201
  });
  for (let i = 0; i < 10; i++) {
    logger.emit(LogType.debug, 'message #' + i);
  }
}
