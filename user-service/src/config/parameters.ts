import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = YAML.load(
  path.join(__dirname, "config.yaml")
);

export const APP_CONFIG = {
  PORT: config.app.port,
  BASE_URL: config.app.baseUrl
};

export const RABBITMQ_CONFIG = {
  PROTOCOL: config.rabbitmq.protocol,
  HOST: config.rabbitmq.host,
  PORT: config.rabbitmq.port,
  USERNAME: config.rabbitmq.username,
  PASSWORD: config.rabbitmq.password,
  EXCHANGE: config.rabbitmq.exchange,

  get CONNECTION_URL() {
    return `${this.PROTOCOL}://${this.USERNAME}:${this.PASSWORD}@${this.HOST}:${this.PORT}`;
  }
};
