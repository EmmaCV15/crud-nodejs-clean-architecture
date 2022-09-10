import { UserRepository } from "../../domain/repositories/User.repository";
import { UserEntity, UserPrimitive } from "../../domain/user/user.aggregate";
import { UserUsername } from "../../domain/user/user.username";
import { UserPassword } from "../../domain/user/user.password";
import { UserModel } from "../models/User.model.mongoose";
import { GlobalFunctions } from "../utils/global.function";

export class UserMongooseRepository implements UserRepository {
  async saveUser(user: UserPrimitive): Promise<string | UserEntity> {
    try {
      const users: Array<UserPrimitive> = await UserModel.find({});

      let userId: number = 1;
      if (users.length > 0) {
        userId += users[users.length - 1].userId;
      }

      user.userId = userId;
      user.password = await GlobalFunctions.encrypt(user.password, 10);

      const newUser = new UserModel({
        ...user,
        _id: user.id && user.id != " " ? user.id : undefined,
      });

      const userSaved: any = await newUser.save();

      return UserEntity.fromPrimitive(
        userSaved.id,
        userSaved.name,
        userSaved.userId,
        userSaved.age,
        userSaved.profession,
        userSaved.username,
        userSaved.password,
        userSaved.createdAt,
        userSaved.updatedAt
      );
    } catch (error: any) {
      return error.message || error.toString();
    }
  }

  async deleteUser(id: string): Promise<string | boolean> {
    try {
      const userDeleted = await UserModel.deleteOne({
        _id: id,
      });

      return userDeleted.deletedCount > 0;
    } catch (error: any) {
      return error.message || error.toString();
    }
  }

  async getUserByLogin(
    userName: UserUsername,
    password: UserPassword
  ): Promise<string | UserEntity> {
    try {
      const userFound: UserPrimitive | null = await UserModel.findOne({
        username: userName.valueOf(),
      });

      if (!userFound) throw new Error("User not found");

      const verifyPassword = await GlobalFunctions.verifyEncrypValues(
        password.valueOf(),
        userFound.password
      );
      if (!verifyPassword) throw new Error("Invalid credentials");

      return UserEntity.objectToEntity(userFound);
    } catch (error: any) {
      return error.message || error.toString();
    }
  }

  async updateUser(user: UserPrimitive): Promise<string | boolean> {
    try {
      if (user?.password) {
        user.password = await GlobalFunctions.encrypt(user.password, 10);
      }

      const userUpdated = await UserModel.updateOne(
        { _id: user.id },
        {
          ...GlobalFunctions.getNewParams(
            user,
            ["createdAt"],
            ["name", "age", "profession", "username", "password"]
          ),
          updatedAt: Date.now(),
        }
      );

      return userUpdated.modifiedCount > 0;
    } catch (error: any) {
      return error.message || error.toString();
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users: Array<UserPrimitive> = await UserModel.find({});

      return users.map((user) =>
        UserEntity.fromPrimitive(
          user.id,
          user.name,
          user.userId,
          user.age,
          user.profession,
          user.username,
          user.password,
          user.createdAt,
          user.updatedAt
        )
      );
    } catch (error: any) {
      return error.message || error.toString();
    }
  }

  async findById(id: string): Promise<string | UserEntity | null> {
    try {
      const userFound: UserPrimitive | null = await UserModel.findById(id);

      return !userFound
        ? null
        : UserEntity.fromPrimitive(
            userFound.id,
            userFound.name,
            userFound.userId,
            userFound.age,
            userFound.profession,
            userFound.username,
            userFound.password,
            userFound.createdAt,
            userFound.updatedAt
          );
    } catch (error: any) {
      return error.message || error.toString();
    }
  }

  async findByUserId(userId: number): Promise<string | UserEntity | null> {
    try {
      const userFound: UserPrimitive | null = await UserModel.findOne({
        userId: userId,
      });

      return !userFound
        ? null
        : UserEntity.fromPrimitive(
            userFound.id,
            userFound.name,
            userFound.userId,
            userFound.age,
            userFound.profession,
            userFound.username,
            userFound.password,
            userFound.createdAt,
            userFound.updatedAt
          );
    } catch (error: any) {
      return error.message || error.toString();
    }
  }
}
