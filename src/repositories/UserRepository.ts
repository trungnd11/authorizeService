import { PaginationOptions } from "mongoose-paginate-ts";
import { IUser, UserModel, UserPageModel } from "../models/User";
import SearchUserRequest from "../dto/request/search/SearchUserRequest";
import PageOptionRequest from "../dto/request/PageOptionRequest";

export default class UserRepository {
  public static async createUser(user: IUser) {
    try {
      const newUser = UserModel.build(user);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  public static async findOneUser(username: string) {
    try {
      const user = await UserModel.findOne({ username: username }).populate("roles").exec();
      return user;
    } catch (error) {
      throw error;
    }
  }

  public static async findAllPage(searchUser: SearchUserRequest, page: PageOptionRequest) {
    try {
      const optionPage: PaginationOptions = {
        populate: "roles",
        ...page,
        query: {
          ...(searchUser.username ? { username: searchUser.username } : {}),
          ...(searchUser.email ? { email: searchUser.email } : {}),
        }
      }
      const pageUser = await UserPageModel.paginate(optionPage);
      return pageUser;
    } catch (error) {
      throw error;
    }
  }
}