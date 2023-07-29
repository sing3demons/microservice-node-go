import logger from './logger'

async function throwError(error: unknown, message?: string) {
  if (error instanceof Error) {
    logger.error(JSON.stringify(error))
  }

  throw new Error(message || 'internal server error')
}

export default throwError
