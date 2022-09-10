import { UserRepository } from "../../domain/repositories/User.repository";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";

export class findAllUserUseCase {
  private static instance: findAllUserUseCase | undefined;
  constructor(private userRepository: UserRepository) {}

  static getInstance(userRepository: UserRepository) {
    if (!this.instance) {
      this.instance = new findAllUserUseCase(userRepository);
    }

    return this.instance;
  }

  async execute(): Promise<Response> {
    const userOerrorMessage = await this.userRepository.findAll();

    let response: ResponsePrimitive = {
      success: false,
      contain: {
        error: 400,
        message: userOerrorMessage,
      },
      status: 400,
    };

    if (Array.isArray(userOerrorMessage)) {
      response = {
        success: true,
        contain: {
          users: userOerrorMessage.map((user) => user.toPrimitives()),
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
