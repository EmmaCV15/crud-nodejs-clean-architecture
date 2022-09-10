import { VideoEntity } from "../../../shared/domain/video/video.aggregate";
import { UserUserId } from "../user/user.userId";

export interface UserService<T> {
  getVideos(userId: UserUserId): Promise<string | Array<T>>;
  saveVideos(video: VideoEntity): Promise<boolean | string>;
  updateVideos(video: VideoEntity): Promise<boolean | string>;
}
