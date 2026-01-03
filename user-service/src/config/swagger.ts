import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import { Express } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(
  path.join(__dirname, "../docs/swagger.yaml")
);

const swaggerSetup = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};

export default swaggerSetup;
