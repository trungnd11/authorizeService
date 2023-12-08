import { Exclude, Expose, Transform } from "class-transformer";
import RoleResponseDto from "../roles/RoleResponseDto";

@Exclude()
export default class UserResponseDto {
  @Expose()
  username: string

  @Expose()
  avatar: string

  @Expose()
  @Transform(({ value }) => value.map((role: RoleResponseDto) => role.name))
  roles: string[]
}