import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import UserService from "../services/UserService";
import { UserRequest } from "../dto/request/UserRequest";
import ResponseEntity from "../dto/response/ResponseEntity";
import PageOptionRequest from "../dto/request/PageOptionRequest";
import { verifyTokenAndRole } from "../middlewares/jwtMiddleware";

export default class UserController extends BaseController {
  private path = "/user"
  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(`${this.path}/create`, verifyTokenAndRole("ADMIN") , this.createUser);
    this.router.post(`${this.path}/list`, verifyTokenAndRole("ADMIN"), this.getListPageUser);
  }
  
  private async getListPageUser(req: Request, res: Response, next: NextFunction) {
    try {
      const pageOption: PageOptionRequest = {
        page: req.query.page as string ?? "1",
        limit: req.query.limit as string ?? "5"
      }
      const pageUser = await UserService.findAllPage(req.body, pageOption);
      return ResponseEntity.success(res, pageUser);
    } catch (error) {
      next(error);
    }
  }

  private async createUser(req: Request<never, never, UserRequest, never>, res: Response, next: NextFunction) {
    try {
      const newUser = await UserService.createUser(req.body);
      return ResponseEntity.success(res, newUser);
    } catch (error) {
      next(error);
    }
  }
}