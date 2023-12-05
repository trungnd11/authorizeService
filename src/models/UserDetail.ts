import mongoose from "mongoose";
import { removeFields } from "../utils/ModelsUtils";
import DateUtils from "../utils/DateUtils";

const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
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

UserInfoSchema.path('createdAt').get((createdAt: Date) => DateUtils.formatDateToString(createdAt));

UserInfoSchema.path('updatedAt').get((updatedAt: Date) => DateUtils.formatDateToString(updatedAt));

export const UserInfoModel = mongoose.model("userInfo", UserInfoSchema);