import RoleEnum from "../enum/RoleEnum";
import { RoleModel } from "../models/Role";

export default class RoleRepository {
  public static async findRoleByName(name: RoleEnum) {
    return await RoleModel.find({ name: { $in: name } })
  } 
}