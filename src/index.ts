import express from 'express'
import dotenv from 'dotenv'
import usersRouter from './router'
import prisma, { ConnectMongo } from './connect'
import logger from './utils/logger'
import consumer from './consumer/user.consumer'

import producer from './producer/users.producer'

dotenv.config()
const port = process.env.PORT || 3000

async function main() {
  await ConnectMongo()

  const app = express()

  app.use(express.json())
  app.get('/', async (req, res) => {
    await producer('hello world')
    res.send('Hello World!')
  })
  app.use(usersRouter)
  app.listen(port, () => logger.info(`Server is listening on port ${port}`))
  await consumer()
}

main()
  .catch(async (e) => {
    logger.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
