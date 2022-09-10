import supertest from "supertest";
import { addHeaders } from "../auth/authentication";
import { Application } from "../../../shared/infrastructure/server/express.server";
import { UserDto } from "../../../user/infrastructure/controllers/dtos/user.dto";
import { UserTest } from "./mocks/users";

export class TestClient {
  private path: string = "/user";
  private request = supertest(new Application().getApp());

  saveUser(user: UserDto = UserTest) {
    return addHeaders(
      this.request.post(`${this.path}/saveUser`).send({ user })
    );
  }

  deleteUser(id: string) {
    return addHeaders(this.request.delete(`${this.path}/deleteUser/${id}`));
  }

  /*updateUser(id: string, user: UserDto) {
    return addHeaders(
      this.request.put(`${this.path}/updateUser/${id}`).send({ user })
    );
  }
  */
  findAll() {
    return addHeaders(this.request.get(`${this.path}/findAll`));
  }

  findByUserId(userId: number) {
    return addHeaders(
      this.request.get(`${this.path}/findByUserId?userId=${userId}`)
    );
  }
}
