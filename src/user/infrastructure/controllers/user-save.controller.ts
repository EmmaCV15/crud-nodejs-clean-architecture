import { Request, Response } from "express";
import { RequestAdapter } from "../adapters/request.adapter";
import UsersRepository from "../repositories";
import { SaveUserUseCase } from "../../application/use-cases/save-user.use.case";
import { UserEntity } from "../../domain/user/user.aggregate";
import { UserDto } from "./dtos/user.dto";

export class UserSaveController {
  private constructor() {}

  static async execute(req: Request, res: Response) {
    try {
      const user: UserDto = await new RequestAdapter().build(req.body.user);

      if (
        !user?.name ||
        !user?.age ||
        !user?.profession ||
        !user?.username ||
        !user?.password
      ) {
        return res.status(400).send({ error: 400, message: "Invalid User" });
      }

      const useCase = SaveUserUseCase.getInstance(UsersRepository);

      const response = await useCase.execute(
        UserEntity.fromPrimitive(
          " ",
          user.name,
          user.userId,
          user.age,
          user.profession,
          user.username,
          user.password,
          Date.now().toString(),
          Date.now().toString()
        )
      );

      const { status, contain, success } = response.toPrimitives();

      return res.status(status).send({ success, ...contain });
    } catch (error: any) {
      return res.status(400).send({ error: 400, message: error.toString() });
    }
  }
}
