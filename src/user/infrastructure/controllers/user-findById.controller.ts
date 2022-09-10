import { Request, Response } from "express";
import UsersRepository from "../repositories";
import { FindByIdUserUseCase } from "../../application/use-cases/findById-user.case";
import { UserId } from "../../domain/user/user.id";

export class UserFindByIdController {
  private constructor() {}

  static async execute(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const useCase = FindByIdUserUseCase.getInstance(UsersRepository);

      const response = await useCase.execute(new UserId(userId));

      const { status, contain, success } = response.toPrimitives();

      return res.status(status).send({ success, ...contain });
    } catch (error: any) {
      return res.status(400).send({ error: 400, message: error.toString() });
    }
  }
}
