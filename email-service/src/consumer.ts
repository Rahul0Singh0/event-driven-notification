import amqp from "amqplib";
import { RABBITMQ_CONFIG } from "./config/parameters.js";

export const startEmailConsumer = async () => {
  const connection = await amqp.connect(
    RABBITMQ_CONFIG.CONNECTION_URL
  );

  const channel = await connection.createChannel();

  await channel.assertExchange(
    RABBITMQ_CONFIG.EXCHANGE,
    "fanout",
    { durable: true }
  );

  await channel.assertQueue(RABBITMQ_CONFIG.QUEUE_NAME, {
    durable: true
  });

  await channel.bindQueue(
    RABBITMQ_CONFIG.QUEUE_NAME,
    RABBITMQ_CONFIG.EXCHANGE,
    ""
  );

  console.log("📧 Email Service consuming from:", RABBITMQ_CONFIG.QUEUE_NAME);

  channel.consume(RABBITMQ_CONFIG.QUEUE_NAME, (msg: any) => {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString());

    console.log(
      `📧 Email sent to ${event.payload.email}`
    );

    channel.ack(msg);
  });
};
