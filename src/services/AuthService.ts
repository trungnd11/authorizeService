import { LoginRequest } from "../dto/request/LoginRequest";
import RoleService from "./RoleService";
import UserService from "./UserService";
import JwtService from "./config/JwtService";

export default class AuthService {
  public static async login(user: LoginRequest) {
    try {
      const { username, password } = user;
      const currentUser = await UserService.findOneUser(username);
      if (!currentUser || !(await currentUser.isPasswordCorrect(password))) {
        throw new Error(`Password is invailid`);
      }
      const rolesId = currentUser.roles;
      const roles = (await RoleService.findRoleById(rolesId)).map(role => `ROLE_${role.name.toUpperCase()}`);
      const payloadToken = {
        username: currentUser.username,
        roles: roles
      }
      const jwtToken = JwtService.generateToken(payloadToken);
      const jwtRefreshToken = JwtService.generateRefreshToken(payloadToken);
      return { accessToken: jwtToken, refreshToken: jwtRefreshToken };
    } catch (error) {
      throw new Error(`Not found: ${error}`);
    }
  }
}