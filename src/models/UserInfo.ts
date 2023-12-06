import mongoose, { Types, Model, Document } from "mongoose";
import { removeFields } from "../utils/ModelsUtils";
import DateUtils from "../utils/DateUtils";

export interface IUserInfo {
  userId: Types.ObjectId
  fullName: string
  phoneNumber: string
  address: string
  age: string
  job: string
}

interface UserInfoDocument extends Document, IUserInfo {

}

interface UserInfoModelInterface extends Model<UserInfoDocument> {
  build: (user: IUserInfo) => UserInfoDocument
}

const Schema = mongoose.Schema;

const UserInfoSchema = new Schema<IUserInfo>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  fullName: String,
  phoneNumber: String,
  address: String,
  age: Number,
  job: String
}, { timestamps: true });

UserInfoSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => removeFields(ret),
});

UserInfoSchema.statics.build = (userInfo: IUserInfo) => new UserInfoModel(userInfo);

UserInfoSchema.path("createdAt").get((createdAt: Date) => DateUtils.formatDateToString(createdAt));

UserInfoSchema.path("updatedAt").get((updatedAt: Date) => DateUtils.formatDateToString(updatedAt));

export const UserInfoModel = mongoose.model<UserInfoDocument, UserInfoModelInterface>("userInfo", UserInfoSchema);