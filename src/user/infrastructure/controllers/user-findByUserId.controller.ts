import { Request, Response } from "express";
import UserRepository from "../repositories";
import { FindByUserIdUserUseCase } from "../../application/use-cases/findByUserId-user.case";
import { UserUserId } from "../../domain/user/user.userId";
import UserService from "../services";

export class UserFindByUserIdController {
  private constructor() {}

  static async execute(req: Request, res: Response) {
    const userId = req.query.userId;

    try {
      const useCase = FindByUserIdUserUseCase.getInstance(
        UserRepository,
        UserService
      );

      const response = await useCase.execute(new UserUserId(Number(userId)));

      const { status, contain, success } = response.toPrimitives();

      return res.status(status).send({ success, ...contain });
    } catch (error: any) {
      return res.status(400).send({ error: 400, message: error.toString() });
    }
  }
}
