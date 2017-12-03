import {Request, Response} from "express";
import {AController} from "../interfaces/AController";
import {schemas} from "../../schemas";
import misc from "../../libs/misc";
import auth from "../../libs/auth";
import {ResponseCode} from "enums/response-code";
import ResponseTemplate from "../../helpers/common/response-template";

class Login extends AController {

  async create(req: Request, res: Response) {
    try {
      let {email, password} = req.body;
      let user = await schemas.User.scope("all").findOne({where: {email}});
      if (!user) {
        return res.send(ResponseTemplate.error({
          code: ResponseCode.DATA_NOT_FOUND,
          message: "Email is not found",
          error: {message: "Email is not found", key: 'email', data: email}
        }));
      }
      if (user.password != misc.sha256(password)) {
        return res.send(ResponseTemplate.error({
          code: ResponseCode.LOGIN_WRONG_PASSWORD,
          message: "Wrong password",
          error: {message: "Wrong password", key: 'password', data: password}
        }));
      }
      let session = await schemas.UserSession.create({});
      let j_user = user.toJSON();
      delete j_user.password;
      let jwt = await auth.createToken({
        id: j_user.id,
        username: j_user.username,
        role: j_user.role
      });
      console.log(jwt);
      
      await session.update({token: jwt.token, expired_at: new Date(jwt.payload.exp * 1000)});
      return res.send(ResponseTemplate.success({token: jwt.token, data: j_user}));
    } catch (e) {
      console.error(e);
      return res.send(ResponseTemplate.error({
        code: ResponseCode.SERVER_INTERNAL_ERROR,
        message: 'Server internal error',
        error: e
      }));
    }
  }
}

const login = new Login();
module.exports = login;
