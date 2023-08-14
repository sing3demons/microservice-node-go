import { PrismaClient, User } from '@prisma/client'
import logger from './utils/logger'
import throwError from './utils/error'

// const prisma = new PrismaClient()

export default class Prisma {
  private readonly _prisma: PrismaClient

  constructor() {
    this._prisma = new PrismaClient()
  }

  public get prisma() {
    return this._prisma
  }

  public connectDB = async () => {
    try {
      await this._prisma.$connect()
      logger.info('Connected to database')
    } catch (error) {
      throwError(error)
      process.exit(1)
    }
  }
}

export { User }
