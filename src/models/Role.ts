import mongoose from "mongoose";
import { removeFields } from "../utils/ModelsUtils";
import DateUtils from "../utils/DateUtils";

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: String
}, { timestamps: true });

RoleSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => removeFields(ret),
});

RoleSchema.path('createdAt').get((createdAt: Date) => DateUtils.formatDateToString(createdAt));

RoleSchema.path('updatedAt').get((updatedAt: Date) => DateUtils.formatDateToString(updatedAt));

export const RoleModel = mongoose.model("role", RoleSchema);