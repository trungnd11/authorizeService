import { Types } from "mongoose";
import { plainToClass } from "class-transformer";
import { UserRequest } from "../dto/request/UserRequest";
import { IUser } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import ObjectUtils from "../utils/ObjectUtils";
import RoleService from "./RoleService";
import { validate } from "class-validator";
import ArrayUtils from "../utils/ArrayUtils";
import HttpException from "../dto/exception/HttpException";
import { HttpCodeEnum } from "../enum/HttpCodeEnum";
import PageResponse from "../dto/response/page/PageResponse";
import UserResponseDto from "../dto/response/user/UserResponseDto";
import SearchUserRequest from "../dto/request/search/SearchUserRequest";
import PageOptionRequest from "../dto/request/PageOptionRequest";

export default class UserService {
  public static async createUser(user: UserRequest) {
    try {
      const userDTO = plainToClass(UserRequest, user);
      const error = await validate(userDTO);
      if (!ArrayUtils.isNullOrEmpty(error)) throw error;
      const roles = await RoleService.findRoleByName(user.roles);
      let rolesId: Types.ObjectId[] = [];
      if (!ObjectUtils.isEmpty(roles)) {
        const mapRolesId = roles.map(({ _id }) => _id);
        rolesId = mapRolesId;
      }
      const newUser: IUser = { ...userDTO, roles: rolesId };
      const createUser = await UserRepository.createUser(newUser);
      return createUser;
    } catch (error) {
      throw error;
    }
  }

  public static async findOneUser(username: string) {
    const user = await UserRepository.findOneUser(username);
    if (ObjectUtils.isEmpty(user)) throw new HttpException(HttpCodeEnum.NOT_FOUND, "Không tìm thấy user");
    return user
  }

  public static async findAllPage(searchUser: SearchUserRequest, page: PageOptionRequest) {
    try {
      const pageUser = await UserRepository.findAllPage(searchUser, page);
      const listUser = pageUser?.docs.map(user => plainToClass(UserResponseDto, user,
        { excludeExtraneousValues: true, enableImplicitConversion: true })) ?? [];
      const totalDocs = pageUser?.totalDocs ?? 0;
      const totalPages = pageUser?.totalPages ?? 0;
      const buildPagesUser: PageResponse<unknown> = {
        doc: listUser,
        totalDocs, totalPages
      }
      return buildPagesUser;
    } catch (error) {
      throw error;
    }
  }
}