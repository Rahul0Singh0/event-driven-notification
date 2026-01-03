import amqp from "amqplib";
import { RABBITMQ_CONFIG } from "../config/parameters.js";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    RABBITMQ_CONFIG.CONNECTION_URL
  );

  channel = await connection.createChannel();
  await channel.assertExchange(
    RABBITMQ_CONFIG.EXCHANGE,
    "fanout",
    { durable: true }
  );

  console.log("RabbitMQ connected.");
};

export const publishEvent = async (event: any) => {
  channel.publish(
    RABBITMQ_CONFIG.EXCHANGE,
    "",
    Buffer.from(JSON.stringify(event)),
    { persistent: true }
  );

  console.log("Event published:", event.type);
};