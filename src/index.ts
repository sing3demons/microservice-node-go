import Server from './server'
import logger from './utils/logger'
import Prisma from './connect'
const prisma = new Prisma()
// const server = new Server()

// server
//   .start()
// .catch(async (e) => {
//   logger.error(JSON.stringify(e.message))
//   process.exit(1)
// })
// .finally(async () => {
//   await prisma.prisma.$disconnect()
// })

Server.start()
  .catch(async (e) => {
    logger.error(JSON.stringify(e.message))
    process.exit(1)
  })
  .finally(async () => {
    await prisma.prisma.$disconnect()
  })
