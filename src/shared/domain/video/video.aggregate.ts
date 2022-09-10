import { AggregateRoot } from "../../../shared/domain/entities/aggregate.root";
import { VideoCreatedAt } from "./video.createdAt";
import { VideoId } from "./video.id";
import { VideoName } from "./video.name";
import { VideoUpdatedAt } from "./video.updatedAt";
import { VideoUserId } from "./video.userId";

export type VideoPrimitive = ReturnType<VideoEntity["toPrimitives"]>;

export class VideoEntity extends AggregateRoot {
  constructor(
    private id: VideoId,
    private name: VideoName,
    private userId: VideoUserId,
    private createdAt: VideoCreatedAt,
    private updatedAt: VideoUpdatedAt
  ) {
    super();
  }

  static fromPrimitive(
    id: string,
    name: string,
    userId: number,
    createdAt: string,
    updatedAt: string
  ) {
    return new VideoEntity(
      new VideoId(id),
      new VideoName(name),
      new VideoUserId(userId),
      new VideoCreatedAt(createdAt),
      new VideoUpdatedAt(updatedAt)
    );
  }

  static objectToEntity({
    id,
    name,
    userId,
    createdAt,
    updatedAt,
  }: {
    id: string;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }) {
    return new VideoEntity(
      new VideoId(id),
      new VideoName(name),
      new VideoUserId(userId),
      new VideoCreatedAt(createdAt),
      new VideoUpdatedAt(updatedAt)
    );
  }

  toPrimitives() {
    return {
      id: this.id.valueOf(),
      name: this.name.valueOf(),
      userId: this.userId.valueOf(),
      createdAt: this.createdAt.valueOf(),
      updatedAt: this.updatedAt.valueOf(),
    };
  }
}
