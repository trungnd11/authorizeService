export default interface JwtDto {
  exp: number
  iat: number
  roles: string[]
  username: string
}