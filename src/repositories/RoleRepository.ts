import { Types } from "mongoose";
import { IRole, RoleModel } from "../models/Role";

export default class RoleRepository {
  public static async findRoleByName(name: string[]) {
    try {
      const roles = await RoleModel.find({ name: { $in: name } });
      return roles;
    } catch (error) {
      throw new Error(`Lỗi khi tìm kiếm vai trò theo tên: ${error}`);
    }
  }

  public static async findRoleById(ids: Types.ObjectId[]) {
    try {
      const roles = await RoleModel.find({ _id: { $in: ids } });
      return roles;
    } catch (error) {
      throw new Error(`Lỗi khi tìm kiếm vai trò theo id: ${error}`);
    }
  }

  public static async createRole(role: IRole) {
    try {
      const newRole = RoleModel.build(role);
      const createdRole = await newRole.save();
      return createdRole;
    } catch (error) {
      throw new Error(`Lỗi khi tạo mới vai trò: ${error}`);
    }
  }
}