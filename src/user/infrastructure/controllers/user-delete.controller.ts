import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/use-cases/delete-user.case";
import { UserId } from "../../domain/user/user.id";
import UsersRepository from "../repositories";

export class UserDeleteController {
  private constructor() {}

  static async execute(req: Request, res: Response) {
    const userId: string = req.params.userId;

    try {
      const useCase = DeleteUserUseCase.getInstance(UsersRepository);

      const response = await useCase.execute(new UserId(userId));

      const { status, contain, success } = response.toPrimitives();

      return res.status(status).send({ success, ...contain });
    } catch (error: any) {
      return res.status(400).send({ error: 400, message: error.toString() });
    }
  }
}
