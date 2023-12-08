import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import RoleService from "../services/RoleService";
import { RoleNameEnum } from "../enum/RoleEnum";
import { IRole } from "../models/Role";
import ResponseEntity from "../dto/response/ResponseEntity";
import { verifyTokenAndRole } from "../middlewares/jwtMiddleware";

export default class RoleController extends BaseController {
  private path = "/role"

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(`${this.path}/find-by-name`, verifyTokenAndRole("ADMIN"), this.findRoleByName);
    this.router.post(`${this.path}/create`, verifyTokenAndRole("ADMIN"), this.createRole);
  }

  async findRoleByName(req: Request, res: Response, next: NextFunction) {
    try {
      const rolesName = req.body.roles;
      const role = await RoleService.findRoleByName(rolesName);
      return ResponseEntity.success(res, role);
    } catch (error) {
      next(error);
    }
  };

  async createRole(req: Request<never, never, IRole, never>, res: Response, next:  NextFunction) {
    const role = req.body;
    try {
      const newRole = await RoleService.createRole(role);
      return ResponseEntity.success(res, newRole);
    } catch (error) {
      next(error);
    }
  };
}