import { UserEntity } from "../../domain/user/user.aggregate";
import { UserRepository } from "../../domain/repositories/User.repository";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";

export class SaveUserUseCase {
  private static instance: SaveUserUseCase | undefined;
  constructor(private userRepository: UserRepository) {}

  static getInstance(userRepository: UserRepository) {
    if (!this.instance) {
      this.instance = new SaveUserUseCase(userRepository);
    }

    return this.instance;
  }

  async execute(user: UserEntity): Promise<Response> {
    const userOerrorMessage = await this.userRepository.saveUser(
      user.toPrimitives()
    );

    let response: ResponsePrimitive = {
      success: false,
      status: 400,
      contain: {
        error: 400,
        message: userOerrorMessage,
      },
    };

    if (userOerrorMessage instanceof UserEntity) {
      response = {
        success: true,
        status: 200,
        contain: {
          user: "User Saved",
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
