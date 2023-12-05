import RoleEnum from "../enum/RoleEnum";
import RoleRepository from "../repositories/RoleRepository";

export default class RoleService {
  public static async findRoleByName(name: RoleEnum) {
    return await RoleRepository.findRoleByName(name);
  }
}