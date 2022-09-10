import { NextFunction, Request, Response } from "express";
import { SecurityMiddleware } from "../../domain/security/middleware";
import { JsonWebToken } from "./jwt";

export class MiddlewareRouter implements SecurityMiddleware {
  private static jwt = new JsonWebToken();

  /**
   * Validation middleware for authentication in a router
   * @param ctx
   * @param next
   */
  async isAuth(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (!req.headers.authorization) {
      return res.status(403).send({
        message: "La peticion no tiene la cabecera de autenticación!!!",
      });
    }

    //quitamos las comillas dobles y simples
    var token = req.headers.authorization.replace(/['"]+/g, "").split(" ")[1];

    // decodificamos el payload
    try {
      var payload = await MiddlewareRouter.jwt.verify(token);

      if (!payload || payload.error) {
        return res.status(404).send({ message: "El token no es valido" });
      }

      if (!(payload?.roles as Array<string>).includes("user"))
        return res
          .status(400)
          .send({ success: false, message: "Permission deneged" });
    } catch (ex) {
      return res.status(404).send({ message: "El token no es valido!!" });
    }

    //saltamos a la siguiente
    next();
  }
}
