import express from "express";
import cors from "cors";
import { connectRabbitMQ } from "./services/rabbitmq.service.js";
import routes from "./routes/index.js";
import swaggerSetup from "./config/swagger.js";
import { APP_CONFIG } from "./config/parameters.js";

const app = express();

// middleware
app.use(cors());  
app.use(express.json());

try {
  await connectRabbitMQ();
} catch (err) {
  console.error("RabbitMQ connection failed:", err);
  process.exit(1);
}

swaggerSetup(app);

app.use("/api", routes);

app.listen(APP_CONFIG.PORT, () => {
  console.log(`User Service running on port ${APP_CONFIG.PORT}`);
});