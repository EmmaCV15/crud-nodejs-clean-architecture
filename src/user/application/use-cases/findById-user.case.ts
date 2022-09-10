import { UserEntity } from "../../domain/user/user.aggregate";
import { UserRepository } from "../../domain/repositories/User.repository";
import { UserId } from "../../domain/user/user.id";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";

export class FindByIdUserUseCase {
  private static instance: FindByIdUserUseCase | null;
  constructor(private userRepository: UserRepository) {}

  static getInstance(userRepository: UserRepository) {
    if (!this.instance) {
      this.instance = new FindByIdUserUseCase(userRepository);
    }
    return this.instance;
  }

  async execute(id: UserId): Promise<Response> {
    const userOrerrorMessage = await this.userRepository.findById(id.valueOf());

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
          user: userOrerrorMessage.toPrimitives(),
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
