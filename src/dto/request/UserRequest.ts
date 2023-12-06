export interface UserRequest {
  username: string
  password: string
  email: string
  avatar?: string
  roles?: string[]
}