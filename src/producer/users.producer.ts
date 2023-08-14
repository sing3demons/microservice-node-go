import kafka from '../kafka'

// async function producer(value: string | Buffer | null) {
//   const producer = kafka.producer()
//   await producer.connect()

//   await producer.send({
//     topic: 'test-topic',
//     messages: [{ value: value }]
//   })

//   await producer.disconnect()
// }

export default class Producer {
  producer = kafka.producer()
  connect = async () => {
    await this.producer.connect()
  }
  
  constructor() {
    this.connect()
  }
  static send = async (topic: string, value: string | Buffer | null) => {
    const { producer } = new Producer()
   await producer.send({
      topic: topic,
      messages: [{ value: value }]
    })
    await producer.disconnect()
  }
}
