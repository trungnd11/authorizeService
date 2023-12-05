import { Request, Response } from "express";

export default class RoleController {
  public static async findRoleByName(req: Request, res: Response) {
    try {
      return res.status(200).json({ role: "ADMIN" });
    } catch (error) {}
  };
}