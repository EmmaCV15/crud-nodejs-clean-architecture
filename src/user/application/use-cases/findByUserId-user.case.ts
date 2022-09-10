import { UserRepository } from "../../domain/repositories/User.repository";
import { UserUserId } from "../../domain/user/user.userId";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";
import { UserEntity } from "../../domain/user/user.aggregate";
import { UserService } from "../../domain/services/user.service";
import { VideoEntity } from "../../../shared/domain/video/video.aggregate";

export class FindByUserIdUserUseCase {
  private static instance: FindByUserIdUserUseCase | undefined;
  constructor(
    private userRepository: UserRepository,
    private userService: UserService<VideoEntity>
  ) {}

  static getInstance(
    userRepository: UserRepository,
    userService: UserService<VideoEntity>
  ) {
    if (!this.instance) {
      this.instance = new FindByUserIdUserUseCase(userRepository, userService);
    }
    return this.instance;
  }

  async execute(userId: UserUserId): Promise<Response> {
    const userOrerrorMessage = await this.userRepository.findByUserId(
      userId.valueOf()
    );

    const videosOrError = await this.userService.getVideos(userId);

    let response: ResponsePrimitive = {
      success: false,
      status: 400,
      contain: {
        error: 400,
        message: userOrerrorMessage,
      },
    };

    if (!userOrerrorMessage) {
      response = {
        success: false,
        contain: {
          error: 404,
          message: "User not Found",
        },
        status: 404,
      };
    }

    if (userOrerrorMessage instanceof UserEntity) {
      response = {
        success: true,
        status: 200,
        contain: {
          user: {
            ...userOrerrorMessage.toPrimitives(),
            videos: Array.isArray(videosOrError)
              ? videosOrError.map((video) => video.toPrimitives())
              : videosOrError,
          },
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
