import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { User } from '../dto/users'
import JSONResponse from './response'
// import TokenJWT from './generateTokens'
import TokenJWT from '@node-auth-jwt/sing3demons'
import { PayloadToken, Token, TokenData, TokenDt } from '../dto/jwt'
import path from 'path'
import fs from 'fs'

const privateKey = fs.readFileSync(
  path.join(__dirname, '../../', 'keys', 'rsa.key'),
  'utf8'
)
const publicKey = fs.readFileSync(
  path.join(__dirname, '../../', 'keys', 'rsa.key.pub'),
  'utf8'
)


const jwtToken = new TokenJWT(privateKey, publicKey)

function generateJWT(user: User): Promise<Token> | undefined {
  return new Promise<Token>((resolve, reject) => {
    const payload: PayloadToken = {
      sub: user.id,
      username: user.username,
      role: user.roles
    }

    try {
      const accessToken = jwtToken.signToken(payload)
      console.log('accessToken', accessToken)
      if (!accessToken) {
        reject(new Error('accessToken is not defined'))
        return
      }
      // const refreshToken = jwt.sign(payload, RTS, { expiresIn: '1d' })
      const refreshToken = jwtToken.signToken(payload, '1d')
      if (!refreshToken) {
        reject(new Error('refreshToken is not defined'))
        return
      }

      resolve({ access_token: accessToken, refresh_token: refreshToken })
    } catch (error) {
      reject(error)
    }
  })
}

function decodeToken(req: Request, res: Response, next: NextFunction) {
  return verify(req as TokenData, res, next)
}

function verify(req: TokenData, res: Response, next: NextFunction) {
  try {
    if (!req.headers['authorization'])
      return JSONResponse.unauthorized(req, res, 'Unauthorized')

    const token = req.headers['authorization'].replace('Bearer ', '')
    const secret: jwt.Secret | undefined = process.env.ACCESS_TOKEN_SECRET
    if (!secret) {
      JSONResponse.unauthorized(req, res, 'Unauthorized')
      return
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return JSONResponse.unauthorized(req, res, 'Unauthorized')
      req.TokenDt = {
        userId: (decoded as TokenDt).sub,
        role: (decoded as TokenDt).role
      }
      next()
    })
  } catch (error) {
    return JSONResponse.unauthorized(req, res, 'Unauthorized')
  }
}

export default class JWTTokens {
  public static generateToken = generateJWT
  private static decodeToken = decodeToken

  public static verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.headers['authorization'])
        return JSONResponse.unauthorized(req, res, 'Unauthorized')

      const token = req.headers['authorization'].replace('Bearer ', '')
      const secret: jwt.Secret | undefined = process.env.ACCESS_TOKEN_SECRET
      if (!secret) {
        JSONResponse.unauthorized(req, res, 'Unauthorized')
        return
      }

      const payload = jwtToken.verifyToken(token)
      if (!payload) {
        JSONResponse.unauthorized(req, res, 'Unauthorized')
        return
      }

      req.user = {
        userId: payload.sub,
        role: payload as PayloadToken['role'],
        username: (payload as PayloadToken).username
      }

      next()
    } catch (error) {
      return JSONResponse.unauthorized(req, res, 'Unauthorized')
    }
  }
}
