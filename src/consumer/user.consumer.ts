import kafka from '../kafka'
import logger from '../utils/logger'

async function consumer(): Promise<void> {
  try {
    const consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        logger.info(
          JSON.stringify({
            value: message?.value?.toString(),
            key: message?.key?.toString(),
            headers: message?.headers,
            topic,
            partition
          })
        )

        if (topic === 'update_profile') {
          console.log('update profile')
        }
        console.log(message?.value?.toString())
      }
    })
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message)
    }
  }
}

export default consumer
