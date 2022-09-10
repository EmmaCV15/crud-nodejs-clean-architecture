import { VideoEntity } from "../../../shared/domain/video/video.aggregate";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";
import { UserService } from "../../domain/services/user.service";

export class SaveVideosUseCase {
  private static instance: SaveVideosUseCase | undefined;
  constructor(private userService: UserService<VideoEntity>) {}

  static getInstance(userService: UserService<VideoEntity>) {
    if (!this.instance) {
      this.instance = new SaveVideosUseCase(userService);
    }
    return this.instance;
  }

  async execute(video: VideoEntity): Promise<Response> {
    const videosOrError = await this.userService.saveVideos(video);

    let response: ResponsePrimitive = {
      success: false,
      status: 400,
      contain: {
        error: 400,
        message: videosOrError,
      },
    };

    if (videosOrError == true) {
      response = {
        success: true,
        status: 200,
        contain: {
          message: "Video created",
        },
      };
    }

    return Response.fromPrimitives(
      response.success,
      response.status,
      response.contain
    );
  }
}
