import { IsEmail, IsNotEmpty } from "class-validator";

export class UserRequest {
  @IsNotEmpty({ message: "Tên đăng nhập không để trống" })
  username: string

  @IsNotEmpty({ message: "Mật khẩu không để trống" })
  password: string

  @IsNotEmpty({ message: "Email không để trống" })
  @IsEmail({}, { message: "Email không đúng định dạng" })
  email: string

  avatar?: string

  roles?: string[]
}