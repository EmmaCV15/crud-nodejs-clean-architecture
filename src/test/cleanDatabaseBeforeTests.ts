import { Mongoose } from "mongoose";
import config from "../shared/infrastructure/config";
import { Database } from "../shared/infrastructure/database/mongo.database";
import "../user/infrastructure/models/User.model.mongoose";

const database = new Database();

let mongodb: Mongoose;

beforeAll(async () => {
  mongodb = await database.getDatabaseToTest(config.database_test.mongo.port);
});

beforeEach(async () => {
  await mongodb.model("user").deleteMany({});
});

afterEach(async () => {
  await mongodb.model("user").deleteMany({});
});

afterAll(async () => {
  await database.disconnect();
});
