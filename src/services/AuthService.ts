import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { LoginRequest } from "../dto/request/LoginRequest";
import RoleService from "./RoleService";
import UserService from "./UserService";
import JwtService from "./config/JwtService";
import HttpException from "../dto/exception/HttpException";
import { HttpCodeEnum } from "../enum/HttpCodeEnum";
import ArrayUtils from "../utils/ArrayUtils";

export default class AuthService {
  public static async login(user: LoginRequest) {
    try {
      const userDTO = plainToClass(LoginRequest, user);
      const error = await validate(userDTO);
      if (!ArrayUtils.isNullOrEmpty(error)) throw error;
      const { username, password } = user;
      const currentUser = await UserService.findOneUser(username);
      if (!(await currentUser.isPasswordCorrect(password))) {
        throw new HttpException(HttpCodeEnum.BAD_REQUEST, "Mật khẩu không đúng");
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
      throw error;
    }
  }
}