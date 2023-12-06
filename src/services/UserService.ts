import { Types } from "mongoose";
import { UserRequest } from "../dto/request/UserRequest";
import { IUser } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import ObjectUtils from "../utils/ObjectUtils";
import RoleService from "./RoleService";

export default class UserService {
  public static async createUser(user: UserRequest) {
    try {
      const roles = await RoleService.findRoleByName(user.roles);
      let rolesId: Types.ObjectId[] = [];
      if (!ObjectUtils.isEmpty(roles)) {
        const mapRolesId = roles.map(({ _id }) => _id);
        rolesId = mapRolesId;
      }
      const newUser: IUser = { ...user, roles: rolesId }
      const createUser = await UserRepository.createUser(newUser);
      return createUser;
    } catch (error) {
      throw new Error(`Lỗi khi tạo mới vai trò: ${error}`);
    }
  }

  public static async findOneUser(username: string) {
    try {
      return await UserRepository.findOneUser(username);
    } catch (error) {
      throw new Error(`Not found: ${error}`);
    }
  }
}