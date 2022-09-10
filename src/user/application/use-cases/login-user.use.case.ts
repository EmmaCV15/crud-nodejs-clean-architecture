import { UserEntity } from "../../domain/user/user.aggregate";
import { UserRepository } from "../../domain/repositories/User.repository";
import {
  Response,
  ResponsePrimitive,
} from "../../domain/response/response.entity";
import { UserUsername } from "../../domain/user/user.username";
import { UserPassword } from "../../domain/user/user.password";
import { JsonWebToken } from "../../../shared/infrastructure/security/jwt";
import { GlobalFunctions } from "../../infrastructure/utils/global.function";

export class LoginUserUseCase {
  private static instance: LoginUserUseCase | undefined;
  constructor(private userRepository: UserRepository) {}

  static getInstance(userRepository: UserRepository) {
    if (!this.instance) {
      this.instance = new LoginUserUseCase(userRepository);
    }

    return this.instance;
  }

  async execute(
    userName: UserUsername,
    password: UserPassword
  ): Promise<Response> {
    const userOerrorMessage = await this.userRepository.getUserByLogin(
      userName,
      password
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
      const newUser = GlobalFunctions.getNewParams(
        userOerrorMessage.toPrimitives(),
        ["password"]
      );

      const token = await new JsonWebToken().sign({
        ...newUser,
        roles: ["user"],
      });

      response = {
        success: true,
        status: 200,
        contain: {
          token,
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
