import { IUserInfo, UserInfoModel } from "../models/UserInfo";

export default class UserInfoRepository {
  public static async createUserInfo(user: IUserInfo) {
    try {
      const newUserInfo = UserInfoModel.build(user);
      const createdUserInfo = await newUserInfo.save();
      return createdUserInfo;
    } catch (error) {
      throw new Error(`Lỗi khi tạo mới chi tiết người dùng: ${error}`);
    }
  }
}