import { PrismaClient, User } from '@prisma/client'
import logger from './utils/logger'

const prisma = new PrismaClient()

async function ConnectMongo() {
  try {
    await prisma.$connect()
    logger.info('Connected to database')
  } catch (error: any) {
    logger.error('Error connecting to database')
    throw new Error(error)
  }
}

export { ConnectMongo, User }

export default prisma
