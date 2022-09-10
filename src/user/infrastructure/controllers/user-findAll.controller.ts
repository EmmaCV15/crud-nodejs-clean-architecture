import { Request, Response } from "express";
import { findAllUserUseCase } from "../../application/use-cases/findAll-user.case";
import UsersRepository from "../repositories";

export class UserFindAllController {
  private constructor() {}

  static async execute(req: Request, res: Response) {
    try {
      const useCase = findAllUserUseCase.getInstance(UsersRepository);

      const response = await useCase.execute();

      const { status, contain, success } = response.toPrimitives();

      return res.status(status).send({ success, ...contain });
    } catch (error: any) {
      return res.status(400).send({ error: 400, message: error.toString() });
    }
  }
}
