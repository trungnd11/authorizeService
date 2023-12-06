import { Request, Response } from "express";
import BaseController from "./BaseController";
import { LoginRequest } from "../dto/request/LoginRequest";
import AuthService from "../services/AuthService";

export default class AuthController extends BaseController {
  private pathLogin = "/login";
  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(this.pathLogin, this.login);
  }

  async login(req: Request<never, never, LoginRequest, never>, res: Response) {
    try {
      const response = await AuthService.login(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ err: error });
    }
  }
}