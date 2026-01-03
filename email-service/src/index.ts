import { startEmailConsumer } from "./consumer.js";

startEmailConsumer().catch((err) => {
  console.error("Email Consumer failed:", err);
  process.exit(1);
});