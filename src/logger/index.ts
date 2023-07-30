import dayjs from 'dayjs'
import { LogDto } from '../dto/logger'
import logger from '../utils/logger'

class Logger {
  private logDto = new LogDto()
  constructor() {}

   info(action: string, data: any) {
    this.logDto.detail = {
      action: action,
      message: JSON.stringify(data),
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    logger.info(JSON.stringify(this.logDto))
  }

  static error(message: string) {
    logger.error(message)
  }
}

export default Logger
