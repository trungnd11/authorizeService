import { IUser, UserModel } from "../models/User";

export default class UserRepository {
  public static async createUser(user: IUser) {
    try {
      const newUser = UserModel.build(user);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw new Error(`Lỗi khi tạo mới tài khoản: ${error}`);
    }
  }

  public static async findOneUser(username: string) {
    try {
      const user = await UserModel.findOne({ username: username }).populate("roles").exec();
      return user;
    } catch (error) {
      throw new Error(`Not found: ${error}`);
    }
  }
}