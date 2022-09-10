import { VideoEntity } from "../../../shared/domain/video/video.aggregate";
import { UserService } from "../../domain/services/user.service";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";

export class UpdateVideoUseCase {
  private static instance: UpdateVideoUseCase | undefined;
  constructor(private userService: UserService<VideoEntity>) {}

  static getInstance(userService: UserService<VideoEntity>) {
    if (!this.instance) {
      this.instance = new UpdateVideoUseCase(userService);
    }
    return this.instance;
  }

  async execute(video: VideoEntity): Promise<Response> {
    const videosOrError = await this.userService.updateVideos(video);

    let response: ResponsePrimitive = {
      success: true,
      status: 200,
      contain: {
        message: "Video Updated",
      },
    };

    if (!videosOrError) {
      response = {
        success: false,
        status: 400,
        contain: {
          error: 400,
          message: "Video not found",
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
