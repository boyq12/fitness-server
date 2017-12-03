import {schemas} from "schemas";
import * as config from "libs/config";
const nodemailer = require('nodemailer');

export default class MailHelper {
  shop_id;
  shop;
  accounts = [];
  defaultEmail;

  constructor() {
    this.defaultEmail = config.defaultEmail;
  }

  public async setShop(shop_id?: number) {
    let shop = await schemas.Shop.findByPrimary(shop_id);
    if (!shop) {
      throw `Shop not found: ${shop_id}`;
    }
    this.shop = shop;
    this.shop_id = shop_id;

    let accounts = await shop.getSupportEmails();
    this.accounts = accounts;
  }

  private async sendMail(mail) {
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
      auth: {user: user, pass: pass}
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

  public async sendForgotPasswordMail(to: string, code: string) {

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

  public async sendActivateCode(to: string, code: string) {
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
};
