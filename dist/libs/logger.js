"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gelf = require('gelf');
var defautConfig = {};
try {
    var config = require('./lib');
    defautConfig = config.graylog;
}
catch (e) {
}
class Logger {
    constructor(options) {
        this.opts = {};
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
        }
        else {
            console.log('start logger with graylog config:');
            console.log(this.opts);
        }
        this.gelf = new Gelf(this.opts);
        try {
            let pack = require('../../package.json');
            this.facility = defautConfig.facility || pack.name;
        }
        catch (e) {
            this.facility = defautConfig.facility || 'Unknown NodeJS';
        }
    }
    emit(l, short, full, other) {
        if (!full) {
            full = short;
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
        }
        catch (e) {
        }
        if (this.local) {
            this.localLog(l, message);
        }
        else {
            this.gelf.emit('gelf.log', message);
        }
    }
    log(short, full, other) {
        this.emit(LogType.debug, short, full, other);
    }
    info(short, full, other) {
        this.emit(LogType.info, short, full, other);
    }
    warn(short, full, other) {
        this.emit(LogType.warning, short, full, other);
    }
    error(short, full, other) {
        this.emit(LogType.error, short, full, other);
    }
    alert(short, full, other) {
        this.emit(LogType.alert, short, full, other);
    }
    localLog(l, message) {
        var data = '';
        var local = '';
        var isFull = (typeof this.local === 'string' && this.local.toLowerCase() === 'full');
        if (isFull) {
            data = JSON.stringify(message, null, 2);
        }
        else {
            data = message.short;
        }
        switch (l) {
            case LogType.debug:
                if (isFull) {
                    console.log(new Date());
                    console.log(data);
                }
                else {
                    console.log(new Date(), data);
                }
                break;
            case LogType.info:
                if (isFull) {
                    console.info(new Date());
                    console.info(data);
                }
                else {
                    console.info(new Date(), data);
                }
                break;
            case LogType.warning:
                if (isFull) {
                    console.warn(new Date());
                    console.warn(data);
                }
                else {
                    console.warn(new Date(), data);
                }
                break;
            default:
                if (isFull) {
                    console.error(new Date());
                    console.error(data);
                }
                else {
                    console.error(new Date(), data);
                }
        }
    }
}
exports.Logger = Logger;
var LogType;
(function (LogType) {
    LogType[LogType["debug"] = 1] = "debug";
    LogType[LogType["info"] = 2] = "info";
    LogType[LogType["notice"] = 3] = "notice";
    LogType[LogType["warning"] = 4] = "warning";
    LogType[LogType["error"] = 5] = "error";
    LogType[LogType["critical"] = 6] = "critical";
    LogType[LogType["alert"] = 7] = "alert";
    LogType[LogType["emergency"] = 8] = "emergency";
})(LogType = exports.LogType || (exports.LogType = {}));

//# sourceMappingURL=logger.js.map
