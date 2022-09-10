import { UserEntity } from "../../domain/user/user.aggregate";
import { UserRepository } from "../../domain/repositories/User.repository";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";

export class UpdateUserUseCase {
  private static instance: UpdateUserUseCase | null;
  constructor(private userRepository: UserRepository) {}

  static getInstance(userRepository: UserRepository) {
    if (!this.instance) {
      this.instance = new UpdateUserUseCase(userRepository);
    }
    return this.instance;
  }

  async execute(user: UserEntity): Promise<Response> {
    const userOerrorMessage = await this.userRepository.updateUser(
      user.toPrimitives()
    );

    let response: ResponsePrimitive = {
      success: true,
      status: 200,
      contain: {
        message: "User Updated",
      },
    };

    if (!userOerrorMessage) {
      response = {
        success: false,
        status: 404,
        contain: {
          error: 404,
          message: "User not found",
        },
      };
    }

    if (typeof userOerrorMessage == "string") {
      response = {
        success: false,
        status: 400,
        contain: {
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
