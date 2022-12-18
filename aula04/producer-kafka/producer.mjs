import { randomUUID } from 'node:crypto' 
import { Kafka } from 'kafkajs'

async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'notifications.producer',
        brokers: ['helped-wren-9729-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'aGVscGVkLXdyZW4tOTcyOSQLPzxebf5NFxrbSXYxxK9p2wbY8pcUKn1M2Nv-QkA',
            password: '3yL6QRKSiYsdn6szphM0tE89W16LSmyL_CyXAQtQv9PITt7lyjgg0uArOPHwwKcwDCYN-Q==',
        },
        ssl: true,
    })
    
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'Nova solicitação de amizade',
                    category: 'social',
                    recipientId: randomUUID()
                })
            }
        ]
    })
    await producer.disconnect()
}

bootstrap.call()