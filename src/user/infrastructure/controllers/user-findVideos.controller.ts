import { Request, Response } from "express";
import { FindVideosByUserIdUseCase } from "../../application/use-cases/findVideos-user.case";
import { UserUserId } from "../../domain/user/user.userId";
import UserService from "../services";

export class UserFindVideosController {
  private constructor() {}

  static async execute(req: Request, res: Response) {
    const userId = req.query.userId;

    try {
      const useCase = FindVideosByUserIdUseCase.getInstance(UserService);

      const response = await useCase.execute(new UserUserId(Number(userId)));

      const { status, contain, success } = response.toPrimitives();

      return res.status(status).send({ success, ...contain });
    } catch (error: any) {
      return res.status(400).send({ error: 400, message: error.toString() });
    }
  }
}
