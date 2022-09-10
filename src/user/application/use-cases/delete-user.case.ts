import { UserRepository } from "../../domain/repositories/User.repository";
import { UserId } from "../../domain/user/user.id";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";

export class DeleteUserUseCase {
  private static instance: DeleteUserUseCase | undefined;
  constructor(private userRepository: UserRepository) {}

  static getInstance(userRepository: UserRepository) {
    if (!this.instance) {
      this.instance = new DeleteUserUseCase(userRepository);
    }

    return this.instance;
  }

  async execute(userId: UserId): Promise<Response> {
    const userOerrorMessage = await this.userRepository.deleteUser(
      userId.valueOf()
    );

    let response: ResponsePrimitive = {
      success: true,
      status: 200,
      contain: {
        message: "User Deleted",
      },
    };

    if (!userOerrorMessage) {
      response = {
        success: false,
        status: 400,
        contain: {
          error: 400,
          message: "User not found",
        },
      };
    }

    if (typeof userOerrorMessage == "string") {
      response = {
        success: false,
        status: 400,
        contain: {
          error: 400,
          message: userOerrorMessage,
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
