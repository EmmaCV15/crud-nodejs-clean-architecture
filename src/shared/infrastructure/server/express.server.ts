import express, {
  Application as app,
  Request,
  Response,
  NextFunction,
} from "express";
import bodyParser from "body-parser";
import { UserRouter } from "../../../user/infrastructure/routes/user.router";

export class Application {
  private app: app;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use((_req: Request, res: Response, next: NextFunction) => {
      res.header("Acess-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accetp, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

      next();
    });
    this.app.use("/user", new UserRouter().getRouter());
  }

  getApp() {
    return this.app;
  }
}
