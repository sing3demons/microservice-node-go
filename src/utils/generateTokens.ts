import jwt from 'jsonwebtoken'
import Prisma, { User } from '../connect'
const { prisma } = new Prisma()
const UserToken = prisma.userToken

const generateTokens = async (user: User) => {
  try {
    const payload = { _id: user.id, roles: user.roles }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '14m'
    })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '30d'
    })

    const userToken = await UserToken.findFirst({ where: { userId: user.id } })
    if (userToken) await UserToken.delete({ where: { id: userToken.id } })

    await UserToken.create({
      data: { userId: user.id, token: refreshToken }
    })
    return Promise.resolve({
      access_token: accessToken,
      refresh_token: refreshToken
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

export default generateTokens
