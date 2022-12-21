import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['helped-wren-9729-us1-kafka.upstash.io:9092'],
                sasl: {
                  mechanism: 'scram-sha-256',
                  username: 'aGVscGVkLXdyZW4tOTcyOSQLPzxebf5NFxrbSXYxxK9p2wbY8pcUKn1M2Nv-QkA',
                  password: '3yL6QRKSiYsdn6szphM0tE89W16LSmyL_CyXAQtQv9PITt7lyjgg0uArOPHwwKcwDCYN-Q==',
                },
                ssl: true,
            }
        })
    }
    async onModuleDestroy() {
        await this.close()
    }
}