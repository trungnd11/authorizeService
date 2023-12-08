import { Exclude, Expose } from "class-transformer";

@Exclude()
export default class RoleResponseDto {
  @Expose()
  name: string
}