import { Request, Response } from "express";
import { UserEntity } from "../../domain/user/user.aggregate";
import { UpdateUserUseCase } from "../../application/use-cases/update-user.case";
import UsersRepository from "../repositories";
import { UserDto } from "./dtos/user.dto";

export class UserUpdateController {
  private constructor() {}

  static async execute(req: Request, res: Response) {
    const userId: string = req.params.userId;
    const user: UserDto = req.body.user;

    try {
      const useCase = UpdateUserUseCase.getInstance(UsersRepository);

      const response = await useCase.execute(
        UserEntity.fromPrimitive(
          userId,
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
