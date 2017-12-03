import {Response} from "express";
import {ResponseCode} from "enums/response-code";

export class ControllerHelper {

  checkNull(obj) {
    for (let key of Object.keys(obj)) {
      if (!obj[key])
        return {
          error: true,
          field: key
        }
    }
    return {
      error: false,
      field: null
    }
  }
}
const helper = new ControllerHelper();
export default helper;
