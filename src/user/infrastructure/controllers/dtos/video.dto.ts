import { IsString, IsNumber } from "class-validator";
import { VideoEntity } from "../../../../shared/domain/video/video.aggregate";

export class VideoDTO {
  @IsString()
  public readonly id!: string;

  @IsString()
  public readonly name!: string;

  @IsNumber()
  public readonly userId!: number;

  @IsString()
  public readonly createdAt!: string;

  @IsString()
  public readonly updatedAt!: string;

  constructor(
    name: string,
    userId: number,
    createdAt: string,
    updatedAt: string
  ) {
    this.name = name;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDomain(video: VideoEntity): VideoDTO {
    return video.toPrimitives();
  }
}
