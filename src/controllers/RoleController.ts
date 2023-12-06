import { Request, Response } from "express";
import BaseController from "./BaseController";
import RoleService from "../services/RoleService";
import { RoleNameEnum } from "../enum/RoleEnum";
import { IRole } from "../models/Role";

export default class RoleController extends BaseController {
  private path = "/role"

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(`${this.path}/find-by-name`, this.findRoleByName);
    this.router.post(`${this.path}/create`, this.createRole);
  }

  async findRoleByName(req: Request, res: Response) {
    try {
      const role = await RoleService.findRoleByName([RoleNameEnum.ADMIN]);
      return res.status(200).json(role);
    } catch (error) {
    }
  };

  async createRole(req: Request<never, never, IRole, never>, res: Response) {
    const role = req.body;
    try {
      const newRole = await RoleService.createRole(role);
      return res.status(200).json(newRole);
    } catch (error) {
      return res.status(400).json({ err: error });
    }
  };
}