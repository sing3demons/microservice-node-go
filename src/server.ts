import express from 'express'
import dotenv from 'dotenv'
import Prisma from './connect'
import logger from './utils/logger'
import usersRouter from './routes'
import helmet from 'helmet'
import JSONResponse from './utils/response'
import promBundle from 'express-prom-bundle'
import cors from 'cors'
// import consumer from './consumer/user.consumer'
// import producer from './producer/users.producer'

dotenv.config()
const prisma = new Prisma()
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {
    project_name: 'users-service',
    project_type: 'users-service_metrics_labels'
  },
  promClient: {
    collectDefaultMetrics: {}
  }
})

class Server {
  private app: express.Application
  private readonly _prisma = prisma

  constructor() {
    this._prisma.connectDB()
    this.app = express()
    this.config()
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(helmet())
    this.app.use(
      cors({
        origin: '*'
      })
    )
    this.app.use(express.json({}))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(metricsMiddleware)
    this.app.use('/images', express.static('public/images'))
    this.router()
    this.app.use((req, res) => {
      JSONResponse.notFound(req, res, 'Not found')
    })
  }

  public router(): void {
    this.app.use('/api', usersRouter)
  }

  static start = async () => {
    const server = new Server()
    server.app.listen(server.app.get('port'), () => {
      logger.info(`Server is listening on port ${server.app.get('port')}`)
    })
    // this.app.listen(this.app.get('port'), () => {
    //   logger.info(`Server is listening on port ${this.app.get('port')}`)
    // })
    // await consumer()
  }
}

export default Server
