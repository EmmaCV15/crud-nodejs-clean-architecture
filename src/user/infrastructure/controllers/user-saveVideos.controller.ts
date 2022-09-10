import { Request, Response } from "express";
import { SaveVideosUseCase } from "../../application/use-cases/saveVideos-user.case";
import { VideoEntity } from "../../../shared/domain/video/video.aggregate";
import { VideoDTO } from "./dtos/video.dto";
import { RequestAdapter } from "../adapters/request.adapter";
import userService from "../services";

export class UserSaveVideosController {
  private constructor() {}

  static async exeucte(req: Request, res: Response) {
    try {
      const video: VideoDTO = await new RequestAdapter().buildVideos(
        req.body.video
      );

      if (!video?.name || !video?.userId) {
        return res.status(400).send({ error: 400, message: "Invalid Video" });
      }

      const useCase = SaveVideosUseCase.getInstance(userService);

      const response = await useCase.execute(
        VideoEntity.fromPrimitive(
          "",
          video.name,
          video.userId,
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
