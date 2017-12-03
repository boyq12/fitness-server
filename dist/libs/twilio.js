"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tw = require('twilio');
var config = require("config");
class Twilio {
    constructor(sid, token, phone) {
        this._phone = phone;
        this._client = new tw(sid, token);
    }
    sendSMS(phonenum, msg) {
        return this._client.messages.create({
            body: msg,
            to: phonenum,
            from: this._phone
        });
    }
}
exports.Twilio = Twilio;
let accountSid = config.sms_service.id;
let authToken = config.sms_service.token;
let phone = config.sms_service.phone_num;
const twilio = new Twilio(accountSid, authToken, phone);
exports.default = twilio;

//# sourceMappingURL=twilio.js.map
