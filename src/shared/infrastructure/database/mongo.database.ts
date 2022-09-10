import mongoose from "mongoose";
import config from "../config";

const mongo = config.database.mongo;

export class Database {
  private database: typeof mongoose;
  constructor() {
    this.database = mongoose;
  }

  public getDatabase(port: number) {
    return this.database
      .connect(
        `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${port}/${mongo.database}`,
        {}
      )
      .then(() => {
        console.log(`Running database on port ${mongo.port}`);
      });
  }

  public async getDatabaseToTest(port: number) {
    return await this.database.connect(
      `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${port}/${mongo.database}`,
      {}
    );
  }

  public async disconnect() {
    await this.database.disconnect();
  }
}
