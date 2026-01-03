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

  const queue = await channel.assertQueue("", {
    exclusive: true
  });

  await channel.bindQueue(
    queue.queue,
    RABBITMQ_CONFIG.EXCHANGE,
    ""
  );

  console.log("Email Consumer waiting for events...");

  channel.consume(queue.queue, (msg: any) => {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString());

    console.log(
      `Sending email to ${event.payload.email}`
    );

    channel.ack(msg);
  });
};
