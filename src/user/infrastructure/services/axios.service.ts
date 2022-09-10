import axios from "axios";
import { UserService } from "../../domain/services/user.service";
import { UserUserId } from "../../domain/user/user.userId";
import {
  VideoEntity,
  VideoPrimitive,
} from "../../../shared/domain/video/video.aggregate";
import config from "../../../shared/infrastructure/config";

export class AxiosService implements UserService<VideoEntity> {
  async getVideos(userId: UserUserId): Promise<Array<VideoEntity>> {
    try {
      const { data } = await axios.get(
        `http://${config.videoApi.host}:${
          config.videoApi.port
        }/video/findByUserId?userId=${userId.valueOf()}`,
        {
          headers: {
            Authorization: config.videoApi.tokenVideo,
          },
        }
      );

      return (data.videos as Array<VideoPrimitive>).map(
        VideoEntity.objectToEntity
      );
    } catch (error: any) {
      return error?.response?.data
        ? `API_VIDEOS_ERROR: ${error?.response?.data.message}`
        : error.toString();
    }
  }

  async saveVideos(video: VideoEntity): Promise<string | boolean> {
    try {
      const { data } = await axios.post(
        `http://${config.videoApi.host}:${config.videoApi.port}/video/saveVideo`,
        {
          video: video.toPrimitives(),
        },
        {
          headers: {
            Authorization: config.videoApi.tokenVideo,
            "Content-Type": "application/json",
          },
        }
      );
      console.info(data);

      return data?.success ? data?.success : false;
    } catch (error: any) {
      return error?.response?.data
        ? `API_VIDEOS_ERROR: ${error?.response?.data.message}`
        : error.toString();
    }
  }

  async updateVideos(video: VideoEntity): Promise<string | boolean> {
    try {
      const VideoPrimitive = video.toPrimitives();
      const { data } = await axios.put(
        `http://${config.videoApi.host}:${config.videoApi.port}/video/updateVideo/${VideoPrimitive.id}`,
        {
          video: video.toPrimitives(),
        },
        {
          headers: {
            Authorization: config.videoApi.tokenVideo,
          },
        }
      );

      return data?.success ? data?.success : false;
    } catch (error: any) {
      return error?.response?.data
        ? `API_VIDEOS_ERROR: ${error?.response?.data.message}`
        : error.toString();
    }
  }
}
