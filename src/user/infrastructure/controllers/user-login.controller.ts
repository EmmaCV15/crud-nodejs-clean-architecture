import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/use-cases/login-user.use.case";
import { UserUsername } from "../../domain/user/user.username";
import { UserPassword } from "../../domain/user/user.password";
import UsersRepository from "../repositories";
import { UserDto } from "./dtos/user.dto";

export class UserLoginController {
  private constructor() {}

  static async execute(req: Request, res: Response) {
    const user: UserDto = req.body.user;

    if (!user?.username || !user?.password)
      return res.status(400).send({
        success: false,
        message: "Invalid data, username or password is wrong",
      });

    try {
      const useCase = LoginUserUseCase.getInstance(UsersRepository);

      const response = await useCase.execute(
        new UserUsername(user.username),
        new UserPassword(user.password)
      );

      const { status, contain, success } = response.toPrimitives();

      return res.status(status).send({ success, ...contain });
    } catch (error: any) {
      return res.status(400).send({ error: 400, message: error.toString() });
    }
  }
}
