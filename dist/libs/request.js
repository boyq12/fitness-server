"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var default_options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
class Request {
    constructor(options) {
        let _this = this;
        var opt = this.init(options);
        ['get', 'post', 'put', 'delete'].map(function (method) {
            _this[method] = req(method, opt);
        });
    }
    init(options) {
        // default using json
        var opt = JSON.parse(JSON.stringify(default_options));
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                opt[i] = options[i];
            }
        }
        return opt;
    }
}
exports.default = Request;
function makeOptions(method, opt) {
    var options = {
        timeout: 10000
    };
    for (var i in opt) {
        if (opt.hasOwnProperty(i)) {
            options[i] = opt[i];
        }
    }
    options.method = method;
    return options;
}
function req(method, opt) {
    return function (url, body, formData) {
        var options = makeOptions(method, opt);
        options.url = (opt.host ? opt.host : "") + url;
        if (typeof body === 'object') {
            options.json = true;
            options.body = body;
        }
        if (formData) {
            options.formData = formData;
            options.json = false;
            delete options.body;
        }
        console.log(new Date() + ' ' + method.toUpperCase() + ': ' + url);
        console.log('options');
        console.log(options);
        console.log('------');
        return new Promise(function (resolve, reject) {
            request(options, function (err, res, body) {
                try {
                    var object = JSON.parse(body);
                    resolve(object);
                }
                catch (e) {
                    console.log('return string');
                }
                return err ? reject(err) : resolve(body);
            });
        });
    };
}

//# sourceMappingURL=request.js.map
