"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require('crypto');
exports.default = {
    uniqueArray: function (arr) {
        var hash = {};
        var result = [];
        arr.forEach(item => hash[item] = 1);
        for (let i in hash) {
            if (hash.hasOwnProperty(i) && hash[i] === 1) {
                result.push(i);
            }
        }
        return result;
    },
    normalize: (str) => {
        let VIETNAMESE_MAP = {
            'á': 'a',
            'à': 'a',
            'ả': 'a',
            'ã': 'a',
            'ạ': 'a',
            'ă': 'a',
            'ắ': 'a',
            'ằ': 'a',
            'ẵ': 'a',
            'ặ': 'a',
            'ẳ': 'a',
            'â': 'a',
            'ấ': 'a',
            'ầ': 'a',
            'ẫ': 'a',
            'ẩ': 'a',
            'ậ': 'a',
            'đ': 'd',
            'é': 'e',
            'è': 'e',
            'ẻ': 'e',
            'ẽ': 'e',
            'ẹ': 'e',
            'ê': 'e',
            'ế': 'e',
            'ề': 'e',
            'ể': 'e',
            'ễ': 'e',
            'ệ': 'e',
            'í': 'i',
            'ì': 'i',
            'ỉ': 'i',
            'ĩ': 'i',
            'ị': 'i',
            'ỏ': 'o',
            'ó': 'o',
            'õ': 'o',
            'ọ': 'o',
            'ò': 'o',
            'ô': 'o',
            'ố': 'o',
            'ồ': 'o',
            'ổ': 'o',
            'ỗ': 'o',
            'ộ': 'o',
            'ơ': 'o',
            'ớ': 'o',
            'ờ': 'o',
            'ở': 'o',
            'ỡ': 'o',
            'ợ': 'o',
            'ù': 'u',
            'ú': 'u',
            'ủ': 'u',
            'ũ': 'u',
            'ụ': 'u',
            'ư': 'u',
            'ứ': 'u',
            'ừ': 'u',
            'ữ': 'u',
            'ử': 'u',
            'ự': 'u',
            'ỳ': 'y',
            'ý': 'y',
            'ỷ': 'y',
            'ỹ': 'y',
            'ỵ': 'y',
            'Á': 'A',
            'À': 'A',
            'Ả': 'A',
            'Ã': 'A',
            'Ạ': 'A',
            'Ă': 'A',
            'Ắ': 'A',
            'Ằ': 'A',
            'Ẵ': 'A',
            'Ặ': 'A',
            'Ẳ': 'A',
            'Â': 'A',
            'Ấ': 'A',
            'Ầ': 'A',
            'Ẫ': 'A',
            'Ẩ': 'A',
            'Ậ': 'A',
            'Đ': 'D',
            'É': 'E',
            'È': 'E',
            'Ẻ': 'E',
            'Ẽ': 'E',
            'Ẹ': 'E',
            'Ê': 'E',
            'Ế': 'E',
            'Ề': 'E',
            'Ể': 'E',
            'Ễ': 'E',
            'Ệ': 'E',
            'Í': 'I',
            'Ì': 'I',
            'Ỉ': 'I',
            'Ĩ': 'I',
            'Ị': 'I',
            'Ô': 'O',
            'Ố': 'O',
            'Ồ': 'O',
            'Ổ': 'O',
            'Ỗ': 'O',
            'Ộ': 'O',
            'Ơ': 'O',
            'Ớ': 'O',
            'Ờ': 'O',
            'Ở': 'O',
            'Ỡ': 'O',
            'Ợ': 'O',
            'Ù': 'U',
            'Ú': 'U',
            'Ủ': 'U',
            'Ũ': 'U',
            'Ụ': 'U',
            'Ư': 'U',
            'Ứ': 'U',
            'Ừ': 'U',
            'Ữ': 'U',
            'Ử': 'U',
            'Ự': 'U',
            'Ỳ': 'Y',
            'Ý': 'Y',
            'Ỷ': 'Y',
            'Ỹ': 'Y',
            'Ỵ': 'Y'
        };
        return str.replace(/[^A-Za-z0-9\[\] ]/g, function (x) {
            return VIETNAMESE_MAP[x] || x;
        });
    },
    CookieParse: function (str) {
        var cookies = decodeURIComponent(str).split(';');
        console.log('cookies:', cookies);
        cookies = cookies.map(function (x) {
            return x.trim();
        });
        console.log('cookies:', cookies);
        var result = {};
        for (let cookie of cookies) {
            let parts = cookie.split('=');
            let index = parts[0];
            let val = parts.splice(1).join('=');
            let json = false;
            try {
                json = JSON.parse(val);
            }
            catch (e) {
            }
            if (json && typeof json === "object") {
                //noinspection TypeScriptValidateTypes
                val = json;
            }
            result[index] = val;
        }
        return result;
    },
    removeBase64Prefix: function (str) {
        var prefix = 'base64,';
        var pos = str.indexOf(prefix);
        if (pos == -1)
            return str;
        return str.substr(pos + prefix.length);
    },
    sha1(str) {
        return crypto.createHash('sha1').update(str).digest('hex');
    },
    sha256(str) {
        return crypto.createHash('sha256').update(str).digest('hex');
    },
    generateCode(n, numberOnly = false) {
        n = n || 5;
        var text = "";
        var charset = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var numOnly = "0123456789";
        if (numberOnly) {
            charset = numOnly;
        }
        else {
            charset = possible;
        }
        for (var i = 0; i < n; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    },
    snake(str) {
        return str.replaceAll(" ", "_");
    },
    encodeBase64(str) {
        return new Buffer(str).toString('base64');
    },
    combinations(str, separator) {
        var fn = function (active, rest, a) {
            if (!active && rest.length == 0)
                return;
            if (rest.length == 0) {
                a.push(active.trim());
            }
            else {
                fn(active + (separator ? separator : "") + rest[0], rest.slice(1), a);
                fn(active, rest.slice(1), a);
            }
            return a;
        };
        return fn("", str, []);
    },
    getWeekNumber(d) {
        if (typeof d == "string") {
            d = new Date(d);
        }
        if (!(d instanceof Date)) {
            throw new Error("Not valid input");
        }
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay()));
        var yearStart = new Date(d.getFullYear(), 0, 1);
        var weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        return weekNo;
    },
    capitalize(str) {
        return str && str.split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") || str;
    }
};

//# sourceMappingURL=misc.js.map
