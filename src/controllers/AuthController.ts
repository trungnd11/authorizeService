import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import { LoginRequest } from "../dto/request/LoginRequest";
import AuthService from "../services/AuthService";
import ResponseEntity from "../dto/response/ResponseEntity";
import LoginResponse from "../dto/response/login/LoginResponse";

export default class AuthController extends BaseController {
  private pathLogin = "/login";
  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(this.pathLogin, this.login);
  }

  async login(req: Request<never, never, LoginRequest, never>, res: Response, next: NextFunction) {
    try {
      const responseJwt = await AuthService.login(req.body);
      return ResponseEntity.success<LoginResponse>(res, responseJwt);
    } catch (error) {
      next(error);
    }
  }
}