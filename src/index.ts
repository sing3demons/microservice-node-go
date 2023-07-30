import express from 'express'
import dotenv from 'dotenv'
import usersRouter from './router'
import Prisma from './connect'
import logger from './utils/logger'


// import consumer from './consumer/user.consumer'
// import producer from './producer/users.producer'

dotenv.config()
const prisma = new Prisma()

class Server {
  public app: express.Application
  private readonly _prisma = prisma

  constructor() {
    this._prisma.connectDB()

    this.app = express()
    this.config()
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    // this.router()
    this.app.use('/api', usersRouter)
  }

  public router = (): void => {
    this.app.use('/api', usersRouter)
  }

  public start = async () => {
    this.app.listen(this.app.get('port'), () => {
      logger.info(`Server is listening on port ${this.app.get('port')}`)
    })
    // await consumer()
  }
}

const server = new Server()
server
  .start()
  .catch(async (e) => {
    logger.error(JSON.stringify(e.message))
    process.exit(1)
  })
  .finally(async () => {
    await prisma.prisma.$disconnect()
  })
