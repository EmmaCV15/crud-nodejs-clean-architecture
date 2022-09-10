import { IsString, IsNumber } from "class-validator";
import { UserEntity } from "../../../domain/user/user.aggregate";

export class UserDto {
  @IsString()
  public readonly id!: string;

  @IsString()
  public readonly name!: string;

  @IsNumber()
  public readonly userId!: number;

  @IsNumber()
  public readonly age!: number;

  @IsString()
  public readonly profession!: string;

  @IsString()
  public readonly username!: string;

  @IsString()
  public readonly password!: string;

  @IsString()
  public readonly createdAt!: string;

  @IsString()
  public readonly updatedAt!: string;

  constructor(
    name: string,
    userId: number,
    age: number,
    profession: string,
    username: string,
    password: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.name = name;
    this.userId = userId;
    this.age = age;
    this.profession = profession;
    this.username = username;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDomain(user: UserEntity): UserDto {
    return user.toPrimitives();
  }
}
