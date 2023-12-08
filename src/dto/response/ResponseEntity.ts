import { Response } from "express";
import { HttpCodeEnum } from "../../enum/HttpCodeEnum";

export default class ResponseEntity {
  static success<T>(response: Response, data: T) {
    const resData = {
      code: "200",
      message: "success",
      data
    }
    return response.status(HttpCodeEnum.OK).json(resData);
  }

  static error<T>(response: Response, statusCode?: HttpCodeEnum, data?: T) {
    const resData = {
      code: `${statusCode}`,
      message: "error",
      data
    }
    return response.status(statusCode ?? HttpCodeEnum.INTERNAL_SERVER_ERROR).json(resData);
  }
}