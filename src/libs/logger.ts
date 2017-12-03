var Gelf = require('gelf');
var defautConfig:any = {};
try {
  var config = require('./lib');
  defautConfig = config.graylog;
} catch (e) {
}

export class Logger {
  opts:any = {};
  facility: string;
  gelf: any;
  local: string;

  constructor(options?: any) {
    options = options || {};
    this.opts = Object.assign({
      graylogPort: 12201,
      graylogHostname: '127.0.0.1',
      connection: 'lan',
      maxChunkSizeWan: 1420,
      maxChunkSizeLan: 8154
    }, defautConfig, options);

    this.local = '';
    if (process.env.logLocal) {
      this.local = process.env.logLocal;
    }
    if (this.local) {
      console.log('start logger with standard log (stdout/stderr)');
    } else {
      console.log('start logger with graylog config:');
      console.log(this.opts);
    }



    this.gelf = new Gelf(this.opts);

    try {
      let pack = require('../../package.json');
      this.facility = defautConfig.facility || pack.name
    } catch (e) {
      this.facility = defautConfig.facility || 'Unknown NodeJS';
    }
  }

  emit(l: LogType, short:string, full?:string, other?: any){
    if (!full) {
      full = short
    }

    let message = {
      "version": "1.0",
      "short_message": short,
      "full_message": full,
      "timestamp": ~~((new Date()).getTime() / 1000),
      "level": l,
      "facility": this.facility
    };
    try {
      if (typeof other === 'object' && Object.keys(other).length > 0) {
        message = Object.assign(message, other);
      }
    } catch (e) {
    }

    if (this.local) {
      this.localLog(l, message);
    } else {
      this.gelf.emit('gelf.log', message);
    }
  }

  log(short:string, full?:string, other?:any) {
    this.emit(LogType.debug, short, full, other);
  }

  info(short:string, full?:string, other?:any) {
    this.emit(LogType.info, short, full, other);
  }

  warn(short:string, full?:string, other?:any) {
    this.emit(LogType.warning, short, full, other);
  }

  error(short:string, full?:string, other?:any) {
    this.emit(LogType.error, short, full, other);
  }

  alert(short:string, full?:string, other?:any) {
    this.emit(LogType.alert, short, full, other);
  }

  private localLog(l: LogType, message:any) {
    var data = '';
    var local = '';
    var isFull = (typeof this.local === 'string' && this.local.toLowerCase() === 'full');
    if (isFull) {
      data = JSON.stringify(message, null, 2);
    } else {
      data = message.short;
    }

    switch (l) {
      case LogType.debug:
        if (isFull) {
          console.log(new Date());
          console.log(data);
        } else {
          console.log(new Date(), data);
        }
        break;

      case LogType.info:
      if (isFull) {
        console.info(new Date());
        console.info(data);
      } else {
        console.info(new Date(), data);
      }
      break;

      case LogType.warning:
        if (isFull) {
          console.warn(new Date());
          console.warn(data);
        } else {
          console.warn(new Date(), data);
        }
        break;
      default:
      if (isFull) {
        console.error(new Date());
        console.error(data);
      } else {
        console.error(new Date(), data);
      }
    }
  }

}

export enum LogType {
  debug = 1, //logger.log
  info, //logger.info
  notice,
  warning, //logger.warn
  error, //logger.error
  critical,
  alert, //logger.alert
  emergency
}
