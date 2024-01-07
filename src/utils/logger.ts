import winston, { createLogger, format, transports } from 'winston'
// import dayjs from 'dayjs'
import { maskEmail } from './sensitive'
const opts: winston.Logform.JsonOptions = {
  replacer: (key, value) => {
    if (key === 'password') {
      return '*****'
    }
    if (key === 'email') {
      return maskEmail(value)
    }
    return value
  }
}
const logger = createLogger({
  level: 'info',
  format: format.json(opts),
  // format: format.combine(
  //   format.colorize(),
  //   format.label({ label: 'server' }),
  //   format.timestamp(),
  //   format.json(),
  //   format.printf(
  //     (info) =>
  //       `${dayjs(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} [${
  //         info.label
  //       }] ${info.level}: ${info.message}`
  //   )
  // ),
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.json(opts)
      // format: format.combine(
      //   format.colorize(),
      //   format.printf(
      //     (info) =>
      //       `${dayjs(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} [${
      //         info.label
      //       }] ${info.level}: ${info.message}`
      //   )
      // )
    })
  ],
  defaultMeta: { service: 'user-service' }
})



export default logger
