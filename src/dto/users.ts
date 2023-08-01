import { User as user } from '@prisma/client'
import { z } from 'zod'

export const UserRequest = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string()
})

export const Profile = z.object({
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  profile: z.string().optional()
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

export class Login {
  email!: string
  password!: string
}

export const LoginRequest = z.object({
  email: z.string().email(),
  password: z.string()
})
