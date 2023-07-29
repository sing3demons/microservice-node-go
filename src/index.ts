import express from 'express'
import dotenv from 'dotenv'
import usersRouter from './router'
import prisma, { ConnectMongo } from './connect'
import logger from './utils/logger'
// import consumer from './consumer/user.consumer'
import Graceful from '@ladjs/graceful'

// import producer from './producer/users.producer'

dotenv.config()
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.get('/', async (req, res) => {
  // await producer('hello world')
  res.send('Hello World!')
})
app.use('/api', usersRouter)

async function main() {
  await ConnectMongo()
  const server = app.listen(port, () =>
    logger.info(`Server is listening on port ${port}`)
  )
  // await consumer()
  new Graceful({ servers: [server] }).listen()
}

main()
  .catch(async (e) => {
    logger.error(JSON.stringify(e.message))
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
