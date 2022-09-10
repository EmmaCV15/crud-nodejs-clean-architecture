import { UserUserId } from "../../domain/user/user.userId";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";
import { UserService } from "../../domain/services/user.service";
import { VideoEntity } from "../../../shared/domain/video/video.aggregate";

export class FindVideosByUserIdUseCase {
  private static instance: FindVideosByUserIdUseCase | undefined;
  constructor(private userService: UserService<VideoEntity>) {}

  static getInstance(userService: UserService<VideoEntity>) {
    if (!this.instance) {
      this.instance = new FindVideosByUserIdUseCase(userService);
    }
    return this.instance;
  }

  async execute(userId: UserUserId): Promise<Response> {
    const videosOError = await this.userService.getVideos(userId);

    let response: ResponsePrimitive = {
      success: false,
      status: 400,
      contain: {
        error: 400,
        message: videosOError,
      },
    };

    if (Array.isArray(videosOError)) {
      response = {
        success: true,
        contain: {
          videos: videosOError.map((video) => video.toPrimitives()),
        },
        status: 200,
      };
    }

    return Response.fromPrimitives(
      response.success,
      response.status,
      response.contain
    );
  }
}
