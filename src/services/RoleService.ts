import { Types } from "mongoose";
import { RoleNameEnum } from "../enum/RoleEnum";
import { IRole } from "../models/Role";
import RoleRepository from "../repositories/RoleRepository";

export default class RoleService {
  public static async findRoleByName(name: string[]) {
    try {
      const roles = await RoleRepository.findRoleByName(name);
      return roles;
    } catch (error) {
      throw new Error(`Lỗi khi tìm vai trò theo tên: ${error}`);
    }
  }

  public static async findRoleById(ids: Types.ObjectId[]) {
    try {
      const roles = await RoleRepository.findRoleById(ids);
      return roles;
    } catch (error) {
      throw new Error(`Lỗi khi tìm vai trò theo tên: ${error}`);
    }
  }

  public static async createRole(role: IRole) {
    try {
      const newRole = await RoleRepository.createRole(role);
      return newRole;
    } catch (error) {
      throw new Error(`Lỗi khi tạo mới vai trò: ${error}`);
    }
  }
}