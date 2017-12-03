var tw = require('twilio');
var config = require("config");

export class Twilio {
    private _client;
    private _phone;
    client;
    constructor(sid: string, token:string, phone: string) {
        this._phone = phone;
        this._client = new tw(sid, token);

    }

    sendSMS(phonenum: string, msg: string) {
        return this._client.messages.create({
            body: msg,
            to: phonenum,
            from: this._phone
        })
    }
}
let accountSid = config.sms_service.id;
let authToken = config.sms_service.token;
let phone = config.sms_service.phone_num;
const twilio = new Twilio(accountSid, authToken, phone);
export default twilio;