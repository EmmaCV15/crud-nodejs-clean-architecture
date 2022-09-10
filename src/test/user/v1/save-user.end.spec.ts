import { UserEntity } from "../../../user/domain/user/user.aggregate";
import { GlobalFunctions } from "../../../user/infrastructure/utils/global.function";
import "../../cleanDatabaseBeforeTests";
import { UserTest } from "../client/mocks/users";
import { TestClient } from "../client/test-client";

describe("Use-Api-End-To-End-Test", () => {
  let client: TestClient;

  beforeAll(() => {
    client = new TestClient();
  });

  it("Should get success when saving mock user", async () => {
    const response = await client.saveUser();

    expect(response.statusCode).toBe(200);
    expect(response._body).toEqual({ success: true, user: "User Saved" });
  });

  it("Should get fail response when trying to save wrong user", async () => {
    const response = await client.saveUser({} as any);

    expect(response.statusCode).toBe(400);
    expect(response._body).toEqual({
      error: 400,
      message: "Error: All information is required",
    });
  });

  it("Should get success when deleting mock user", async () => {
    await client.saveUser();
    const userFound = await client.findByUserId(1);
    const response = await client.deleteUser(userFound._body.user.id);

    expect(response.statusCode).toBe(200);
    expect(response._body).toEqual({
      message: "User Deleted",
      success: true,
    });
  });

  it("Should get fail when deleting mock user", async () => {
    const response = await client.deleteUser("630936f4156f37dcb38df9k6");

    expect(response.statusCode).toBe(400);
    expect(response._body).toEqual({
      error: 400,
      message:
        'Cast to ObjectId failed for value "630936f4156f37dcb38df9k6" (type string) at path "_id" for model "user"',
      success: false,
    });
  });

  /* it("Should get success when updating mock user", async () => {
    await client.saveUser();

    const userFound = await client.findByUserId(1);

    const userUpdated = await client.updateUser({
      ...userFound,
      name: "Eder",
      age: 43,
    });

    expect(userUpdated.statusCode).toBe(200);
  }); */

  it("Should get success when finding by id", async () => {
    await client.saveUser();

    const response = await client.findAll();

    expect(response.statusCode).toBe(200);
    expect(response._body).toEqual({
      success: true,
      user: expect.objectContaining(
        GlobalFunctions.getNewParams(UserTest, [
          "id",
          "password",
          "createdAt",
          "updatedAt",
        ])
      ),
    });
  });

  it("Should get success when finding by userId", async () => {
    await client.saveUser();

    const response = await client.findByUserId(1);

    expect(response.statusCode).toBe(200);
    expect(response._body).toEqual({
      success: true,
      user: expect.objectContaining(
        GlobalFunctions.getNewParams(UserTest, [
          "id",
          "password",
          "createdAt",
          "updatedAt",
        ])
      ),
    });
  });
});
