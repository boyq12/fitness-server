"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("schemas");
const config = require("libs/config");
const nodemailer = require('nodemailer');
class MailHelper {
    constructor() {
        this.accounts = [];
        this.defaultEmail = config.defaultEmail;
    }
    async setShop(shop_id) {
        let shop = await schemas_1.schemas.Shop.findByPrimary(shop_id);
        if (!shop) {
            throw `Shop not found: ${shop_id}`;
        }
        this.shop = shop;
        this.shop_id = shop_id;
        let accounts = await shop.getSupportEmails();
        this.accounts = accounts;
    }
    async sendMail(mail) {
        let chosen = this.accounts[0] || this.defaultEmail;
        console.log("Email", this.accounts[0], this.defaultEmail, chosen);
        if (!chosen) {
            throw "Shop have not been set up or supporter mail can not be found";
        }
        var user = chosen.username;
        var pass = chosen.password;
        var host = chosen.host;
        var smtpConfig = {
            host: host,
            port: chosen.port || 587,
            secure: chosen.secure || false,
            auth: { user: user, pass: pass }
        };
        var transporter = nodemailer.createTransport(smtpConfig);
        var mailOptions = {
            from: `"${this.shop.title}" <${user}>`,
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        };
        return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
    async sendForgotPasswordMail(to, code) {
        let content = `Mã khôi phục cho tài khoản của bạn tại ${this.shop.title}: ${code} <br>Lưu ý: Mã này chỉ tồn tại trong vòng 5 phút sau khi cấp`;
        let content_text = content.replaceAll("<br>", "");
        let forgotMail = {
            to: to,
            subject: `[${this.shop.title}] Mã khôi phục mật khẩu`,
            text: content_text,
            html: content
        };
        return this.sendMail(forgotMail);
    }
    async sendActivateCode(to, code) {
        let content = `Mật mã kích hoạt cho tài khoản của bạn tại ${this.shop.title}: ${code}`;
        let content_text = content.replaceAll("<br>", "");
        let activationMail = {
            to: to,
            subject: `[${this.shop.title}] Mã kích hoạt tài khoản`,
            text: content_text,
            html: content
        };
        return this.sendMail(activationMail);
    }
}
exports.default = MailHelper;
;

//# sourceMappingURL=mail-helper.js.map
