import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import UserService from "../services/UserService";
import { UserRequest } from "../dto/request/UserRequest";

export default class UserController extends BaseController {
  private path = "/user"
  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(`${this.path}/create`, this.createUser);
    this.router.post(`${this.path}/list`, this.getListPageUser);
  }
  
  private async getListPageUser(req: Request, res: Response, next: NextFunction) {
    try {
      const pageUser = await UserService.findAllPage();
      return res.status(201).json(pageUser);
    } catch (error) {
      next(error);
    }
  }

  private async createUser(req: Request<never, never, UserRequest, never>, res: Response, next: NextFunction) {
    try {
      const newUser = await UserService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}