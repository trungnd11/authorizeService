import { Pagination } from "mongoose-paginate-ts";
import { IUser, UserModel, UserPageModel } from "../models/User";

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

  public static async findAllPage() {
    try {
      const pageUser = await UserPageModel.paginate({});
      return pageUser;
    } catch (error) {
      throw error;
    }
  }
}