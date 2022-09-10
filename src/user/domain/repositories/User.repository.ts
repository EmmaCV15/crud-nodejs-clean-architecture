import { UserEntity, UserPrimitive } from "../user/user.aggregate";
import { UserPassword } from "../user/user.password";
import { UserUsername } from "../user/user.username";

export interface UserRepository {
  saveUser(user: UserPrimitive): Promise<UserEntity | string>;
  deleteUser(id: string): Promise<boolean | string>;
  updateUser(user: UserPrimitive): Promise<boolean | string>;
  findAll(): Promise<Array<UserEntity> | string>;
  findById(id: string): Promise<UserEntity | null | string>;
  findByUserId(userId: number): Promise<UserEntity | null | string>;
  getUserByLogin(
    userName: UserUsername,
    password: UserPassword
  ): Promise<string | UserEntity>;
}
