import { EventHubProducerClient } from "@azure/event-hubs";

export class EventHub {
    private producer;
    constructor() {
        const connectionString = "Endpoint=sb://eventhack.servicebus.windows.net/;SharedAccessKeyName=hack;SharedAccessKey=HeHeVaVqyVkntO2FnjQcs2Ilh/4MUDo4y+AEhKp8z+g=;EntityPath=simulacoes";
        const eventHubName = "";
        this.producer = new EventHubProducerClient(connectionString, eventHubName);
    }
    public async send(json: any): Promise<boolean> {
        const batch = await this.producer.createBatch();
        batch.tryAdd({ body: json });
        try {
            await this.producer.sendBatch(batch);
            await this.producer.close()
            return true;
        } catch (error) {
            console.error("Error when sending batch: ", error);
            return false;
        }
    }
}