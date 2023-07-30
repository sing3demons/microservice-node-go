import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { User } from '../dto/users'
import JSONResponse from './response'
import TokenJWT from './generateTokens'
import { PayloadToken, Token, TokenData, TokenDt } from '../dto/jwt'

function generateJWT(user: User): Promise<Token> | undefined {
  return new Promise<Token>((resolve, reject) => {
    const payload: PayloadToken = {
      sub: user.id,
      username: user.username,
      role: user.roles
    }

    // const ATS: jwt.Secret | undefined = process.env.ACCESS_TOKEN_SECRET
    // if (!ATS) {
    //   reject(new Error('ACCESS_TOKEN_SECRET is not defined'))
    //   return
    // }
    // const RTS: jwt.Secret | undefined = process.env.REFRESH_TOKEN_SECRET
    // if (!RTS) {
    //   reject(new Error('REFRESH_TOKEN_SECRET is not defined'))
    //   return
    // }
    try {
      // const accessToken = jwt.sign(payload, ATS, { expiresIn: '1h' })
      const accessToken = TokenJWT.signToken(payload)
      if (!accessToken) {
        reject(new Error('accessToken is not defined'))
        return
      }
      // const refreshToken = jwt.sign(payload, RTS, { expiresIn: '1d' })
      const refreshToken = TokenJWT.signToken(payload, '1d')
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

      const payload = TokenJWT.verifyToken(token)
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
