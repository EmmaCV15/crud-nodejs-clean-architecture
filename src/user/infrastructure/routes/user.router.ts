import { Router, Request, Response } from "express";
import { MiddlewareRouter } from "../../../shared/infrastructure/security/middleware";
import { UserDeleteController } from "../controllers/user-delete.controller";
import { UserFindAllController } from "../controllers/user-findAll.controller";
import { UserFindByIdController } from "../controllers/user-findById.controller";
import { UserFindByUserIdController } from "../controllers/user-findByUserId.controller";
import { UserLoginController } from "../controllers/user-login.controller";
import { UserSaveController } from "../controllers/user-save.controller";
import { UserUpdateController } from "../controllers/user-update.controller";
import { UserFindVideosController } from "../controllers/user-findVideos.controller";
import { UserSaveVideosController } from "../controllers/user-saveVideos.controller";
import { UserUpdateVideosController } from "../controllers/user-updateVideos.controller";

export class UserRouter {
  private router: Router;
  private middleware: MiddlewareRouter;
  constructor() {
    this.router = Router();
    this.middleware = new MiddlewareRouter();

    this.router.get(
      "/holamundo",
      this.middleware.isAuth,
      (req: Request, res: Response) => {
        return res.status(200).send({ message: "Working on" });
      }
    );

    this.router.post("/saveUser", UserSaveController.execute);

    this.router.delete("/deleteUser/:userId", UserDeleteController.execute);

    this.router.put("/updateUser/:userId", UserUpdateController.execute);

    this.router.get("/findAll", UserFindAllController.execute);

    this.router.get("/findById/:userId", UserFindByIdController.execute);

    this.router.get("/findByUserId", UserFindByUserIdController.execute);

    this.router.get("/login", UserLoginController.execute);

    this.router.get("/findVideos", UserFindVideosController.execute);

    this.router.post("/saveVideos", UserSaveVideosController.exeucte);

    this.router.put(
      "/updateVideo/:videoId",
      UserUpdateVideosController.execute
    );
  }

  public getRouter() {
    return this.router;
  }
}
