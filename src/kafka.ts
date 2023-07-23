import { Kafka } from 'kafkajs'
import logger from './utils/logger'

const brokers: string = process.env.KAFKA_BROKERS!
const kafka = new Kafka({
  clientId: 'users-service',
  brokers: () => {
    logger.info(`Kafka brokers: ${brokers}`)
    return [brokers]
  },
  requestTimeout: 25000,
  retry: {
    factor: 0,
    multiplier: 4,
    maxRetryTime: 25000,
    retries: 10,
  },
})

export default kafka
