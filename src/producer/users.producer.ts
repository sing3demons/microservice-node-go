import kafka from '../kafka'

async function producer(value: string | Buffer | null) {
  const producer = kafka.producer()
  await producer.connect()

  await producer.send({
    topic: 'test-topic',
    messages: [{ value: value }],
  })

  await producer.disconnect()
}

export default producer
