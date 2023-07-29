import { PrismaClient, User } from '@prisma/client'
import logger from './utils/logger'
import throwError from './utils/error'

const prisma = new PrismaClient()

async function ConnectMongo() {
  try {
    await prisma.$connect()
    logger.info('Connected to database')
  } catch (error) {
    throwError(error)
    process.exit(1)
  }
}

export { ConnectMongo, User }

export default prisma
