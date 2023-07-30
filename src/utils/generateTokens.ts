import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import { PayloadToken } from '../dto/jwt'

const privateKey = fs.readFileSync(
  path.join(__dirname, '../', 'keys', 'rsa.key'),
  'utf8'
)
const publicKey = fs.readFileSync(
  path.join(__dirname, '../', 'keys', 'rsa.key.pub'),
  'utf8'
)

export default class TokenJWT {
  static signToken(payload: PayloadToken, expire?: string): string {
    const token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: expire ? expire : '1h'
    })
    return token
  }

  static verifyToken(token: string): string | jwt.JwtPayload {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    return decoded
  }
}
