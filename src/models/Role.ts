import mongoose, { Document, Model } from "mongoose";
import { removeFields } from "../utils/ModelsUtils";
import DateUtils from "../utils/DateUtils";

export interface IRole {
  name: string
}

interface RoleDocument extends Document, IRole {
  
}

interface RoleModelInterface extends Model<RoleDocument> {
  build(attr: IRole): RoleDocument;
}

const Schema = mongoose.Schema;

const RoleSchema = new Schema<IRole>({
  name: String
}, { timestamps: true });

RoleSchema.statics.build = (role: IRole) => new RoleModel(role);

RoleSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => removeFields(ret),
});

RoleSchema.path('createdAt').get((createdAt: Date) => DateUtils.formatDateToString(createdAt));

RoleSchema.path('updatedAt').get((updatedAt: Date) => DateUtils.formatDateToString(updatedAt));

export const RoleModel = mongoose.model<RoleDocument, RoleModelInterface>("role", RoleSchema);