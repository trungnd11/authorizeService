import { IsNotEmpty, Length, ValidateIf } from "class-validator";

const setErrorMessage = ({ value }) => `${typeof value === "string" ? (value?.length < 5
  ? "Tên đăng nhập phải từ 5 ký tự"
  : value?.length > 20 && "Tên đăng nhập quá 20 ký tự") : ""}`;

export class LoginRequest {
  @IsNotEmpty({ message: "Tên đăng nhập không để trống" })
  @Length(5, 20, { message: setErrorMessage })
  username: string | null;

  @IsNotEmpty({ message: "Mật khẩu không để trống" })
  password: string | null;
}