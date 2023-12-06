import mongoose, { Types, Document, Model } from "mongoose";
import { removeFields } from "../utils/ModelsUtils";
import DateUtils from "../utils/DateUtils";
import { compareBcryt, enCodeBcryt } from "../utils/helpper/bcrypt";
export interface IUser {
  username: string
  password: string
  email: string
  avatar?: string
  roles: Types.ObjectId[]
}

interface UserDocument extends Document, IUser {
  isPasswordCorrect(providedPassword: string): Promise<boolean>;
}

interface UserModelInterface extends Model<UserDocument> {
  build: (user: IUser) => UserDocument
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [5, "Tên đăng nhập phải từ 6 ký tự"],
      maxlength: [20, "Tên đăng nhập quá 20 ký tự"],
      validate: {
        validator: async function (v: string): Promise<boolean> {
          let doc: any = await UserModel.findOne({ username: v });
          // @ts-ignore
          if (doc) return this._id.toString() === doc._id.toString();
          else return Boolean(!doc);
        },
        message: "Tên đăng nhập đã tồn tại"
      }
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      trim: true,
      minlength: [6, "Mật khẩu phải từ 6 ký tự"],
      maxlength: [50, "Mật khẩu quá 50 ký tự"]
    },
    roles: [{
      type: Schema.Types.ObjectId,
      ref: "role",
    }],
    avatar: String,
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => removeFields(ret),
});

UserSchema.pre("save", async function (next) {
  const thisObj = this as unknown as IUser;
  if (!this.isModified("password")) return next();
  const passwordEndcode = await enCodeBcryt(thisObj.password);
  thisObj.password = passwordEndcode;
  next();
});

UserSchema.statics.build = (user: IUser) => new UserModel(user);

UserSchema.method("isPasswordCorrect", async function (providedPassword: string): Promise<boolean> {
  return await compareBcryt(providedPassword, this.password);
});

UserSchema.path("createdAt").get((createdAt: Date) => DateUtils.formatDateToString(createdAt));

UserSchema.path("updatedAt").get((updatedAt: Date) => DateUtils.formatDateToString(updatedAt));

export const UserModel = mongoose.model<UserDocument, UserModelInterface>("user", UserSchema);
