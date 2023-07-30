import jwt from 'jsonwebtoken'
import Prisma from '../connect'
const { prisma } = new Prisma()
const UserToken = prisma.userToken

const verifyRefreshToken = async (refreshToken: string) => {
  const privateKey = process.env.REFRESH_TOKEN_SECRET!

  const token = await UserToken.findFirst({ where: { token: refreshToken } })
  if (!token) throw new Error('Invalid refresh token')

  jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
    if (err) throw new Error('Invalid refresh token')
    return {
      tokenDetails,
      error: false,
      message: 'Valid refresh token'
    }
  })
}

export default verifyRefreshToken
