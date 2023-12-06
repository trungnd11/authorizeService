import { Request, Response } from "express";
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
  }
  
  private async getListUser() {
    try {
      
    } catch (error) {
      
    }
  }

  private async createUser(req: Request<never, never, UserRequest, never>, res: Response) {
    try {
      const newUser = await UserService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ err: "Lỗi" });
    }
  }
}