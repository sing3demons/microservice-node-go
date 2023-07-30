import { Request } from "express"

export interface Token {
  access_token: string
  refresh_token: string
}

export interface PayloadToken {
  sub: string
  username: string
  role: string
}

export interface TokenDt {
  userId?: string
  role?: string
  sub?: string
}

export interface TokenData extends Request {
  TokenDt: TokenDt
}
