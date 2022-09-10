import { Application } from "./shared/infrastructure/server/express.server";
import config from "./shared/infrastructure/config";
import { Database } from "./shared/infrastructure/database/mongo.database";

const database = new Database();

database.getDatabase(config.database.mongo.port);

const server = new Application().getApp();

server.listen(config.server.port, () => {
  console.log(`Server on port ${config.server.port}`);
});
