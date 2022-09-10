import jsonwebtoken from "jsonwebtoken";
import moment from "moment";
import { SecurityJwt } from "../../domain/security/jwt";
import config from "../config";

export class JsonWebToken implements SecurityJwt {
  private readonly secretKey: string = config.JWT.secretKey;

  /**
   * Sign the information and return a token
   * @param data
   * @returns <string | any>
   */
  async sign(data: object): Promise<string | object> {
    try {
      return await jsonwebtoken.sign(
        { ...data, exp: moment().add(1, "day").unix() },
        this.secretKey
      );
    } catch (error) {
      return { error };
    }
  }

  /**
   * @param token
   * @returns <string | any>
   */
  async verify(token: string): Promise<string | any> {
    try {
      return await jsonwebtoken.verify(token, this.secretKey);
    } catch (error) {
      return { error };
    }
  }
}
