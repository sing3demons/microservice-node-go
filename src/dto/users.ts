import { User as user } from '@prisma/client'
import { z } from 'zod'

export const UserRequest = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type RequestQuery = {
  size?: number
  skip?: number
}

export interface User extends user {}

export interface UsersResponse {
  total: number
  users: User[]
}
