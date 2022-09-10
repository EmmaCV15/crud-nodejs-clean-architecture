import { VideoEntity } from "../../../shared/domain/video/video.aggregate";
import { VideoDTO } from "./dtos/video.dto";
import { Request, Response } from "express";
import { UpdateVideoUseCase } from "../../application/use-cases/updateVideos-user.case";
import userService from "../services";
import { RequestAdapter } from "../adapters/request.adapter";

export class UserUpdateVideosController {
  constructor() {}

  static async execute(req: Request, res: Response) {
    const videoId: string = req.params.videoId;

    try {
      const video: VideoDTO = await new RequestAdapter().buildVideos(
        req.body?.video
      );
      const useCase = UpdateVideoUseCase.getInstance(userService);

      const response = await useCase.execute(
        VideoEntity.fromPrimitive(
          videoId,
          video.name,
          video.userId || 0,
          Date.now().toString(),
          Date.now().toString()
        )
      );

      const { status, success, contain } = response.toPrimitives();
      return res.status(status).send({ success, ...contain });
    } catch (error: any) {
      return res.status(400).send({ error: 400, message: error.toString() });
    }
  }
}
