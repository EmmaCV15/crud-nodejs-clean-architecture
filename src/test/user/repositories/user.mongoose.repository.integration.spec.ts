import { UserRepository } from "../../../user/domain/repositories/User.repository";
import {
  UserEntity,
  UserPrimitive,
} from "../../../user/domain/user/user.aggregate";
import { UserUserId } from "../../../user/domain/user/user.userId";
import { UserUsername } from "../../../user/domain/user/user.username";
import { UserMongooseRepository } from "../../../user/infrastructure/repositories/user.mongoose.repository";
import { GlobalFunctions } from "../../../user/infrastructure/utils/global.function";
import "../../cleanDatabaseBeforeTests";

describe("UserMongooseRepository", () => {
  let repository: UserRepository;
  let user: UserPrimitive;
  beforeAll(() => {
    repository = new UserMongooseRepository();
  });

  beforeEach(() => {
    user = {
      id: "630936f4156f37dcb38df9d3",
      userId: 1,
      name: "test",
      age: 22,
      profession: "Engineer",
      username: "test",
      password: "pass",
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
  });

  it("Should get define repository", () => {
    expect(repository).toBeDefined();
    expect(repository).toBeInstanceOf(UserMongooseRepository);
  });

  it("Should save user in the database", async () => {
    const result = await repository.saveUser(user);

    expect(result).toBeInstanceOf(UserEntity);
    expect((result as UserEntity).getName().valueOf()).toEqual(user.name);
  });

  it("Should get error when try to save the user with wrong params", async () => {
    const userToDelete: any = { ...user };

    delete userToDelete.username;
    const result = await repository.saveUser(userToDelete);

    expect(result).toBeDefined();
    expect(result).toContain("User-Username is not valid");
  });

  it("Should delete user in the database", async () => {
    await repository.saveUser(user);

    const userFound = (await repository.findByUserId(1)) as UserEntity;

    const deleteAction = await repository.deleteUser(
      userFound.getId().valueOf()
    );

    expect(deleteAction).toBeDefined();
    expect(deleteAction).toBeTruthy();
  });

  it("Should get false value when we try to delete inexisten user", async () => {
    const deleteAction = await repository.deleteUser(
      "630936f4156f37dcb38df9d3"
    );

    expect(deleteAction).toBeDefined();
    expect(deleteAction).toBeFalsy();
  });

  it("Should get error when we try to delete with wrong format id", async () => {
    const deleteAction = await repository.deleteUser("6");

    expect(deleteAction).toBeDefined();
    expect(deleteAction).toContain("failed");
  });

  it("Should update User in the database", async () => {
    await repository.saveUser(user);

    const userFound = (await repository.findByUserId(1)) as UserEntity;

    const userUpdated = await repository.updateUser({
      ...userFound.toPrimitives(),
      name: "root",
      age: 44,
    });

    expect(userUpdated).toBeTruthy();
  });

  it("Should get a false user when tries to update it", async () => {
    const updateAction = await repository.updateUser({
      ...user,
      name: "legin",
    });

    expect(updateAction).toBeFalsy();
  });

  it("Should get error when we try to update user", async () => {
    const updateAction = await repository.updateUser({ ...user, id: "1" });

    expect(updateAction).toBeDefined();
    expect(updateAction).toContain("failed");
  });

  it("Should find all users in the database", async () => {
    await repository.saveUser(user);

    const users = (await repository.findAll()) as Array<UserEntity>;

    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(Array<UserEntity>);
    expect(users).toHaveLength(1);

    expect(users[0].toPrimitives()).toEqual(
      expect.objectContaining(
        GlobalFunctions.getNewParams(user, [
          "id",
          "password",
          "createdAt",
          "updatedAt",
        ])
      )
    );
  });

  it("Shoud find user by Id in the database", async () => {
    await repository.saveUser(user);

    const userFound = (await repository.findById(
      "630936f4156f37dcb38df9d3"
    )) as UserEntity;

    expect(userFound).toBeDefined();
    expect(userFound).toBeInstanceOf(UserEntity);
    expect(userFound.toPrimitives()).toEqual(
      expect.objectContaining(
        GlobalFunctions.getNewParams(user, [
          "id",
          "password",
          "createdAt",
          "updatedAt",
        ])
      )
    );
  });

  it("Should get false value when we try to findById inexisten user", async () => {
    await repository.saveUser(user);

    const userFound = await repository.findById("630936f4156f37dcb38df9d2");

    expect(userFound).toEqual(null);
  });

  it("Should get error value when we try to find user by Id ", async () => {
    await repository.saveUser(user);

    const userFound = await repository.findById("630f37dcb38df9d2");

    expect(userFound).toContain("failed");
  });

  it("Should find user by userId in the database", async () => {
    await repository.saveUser(user);

    const userFound = (await repository.findByUserId(1)) as UserEntity;

    expect(userFound).toBeDefined();
    expect(userFound.toPrimitives()).toEqual(
      expect.objectContaining(
        GlobalFunctions.getNewParams(user, [
          "id",
          "password",
          "createdAt",
          "updatedAt",
        ])
      )
    );
  });

  it("Should get false value when we try to find user by userId", async () => {
    const userFound = await repository.findByUserId(2);

    expect(userFound).toBeDefined();
    expect(userFound).toEqual(null);
  });

  it("Should get error value when we try to find user by userId", async () => {
    const userFound = await repository.findByUserId("a" as any);

    expect(userFound).toBeDefined();
    expect(userFound).toContain("failed");
  });
});
