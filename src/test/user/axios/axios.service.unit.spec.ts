import nock from "nock";
import { UserService } from "../../../user/domain/services/user.service";
import {
  VideoEntity,
  VideoPrimitive,
} from "../../../shared/domain/video/video.aggregate";
import { AxiosService } from "../../../user/infrastructure/services/axios.service";
import { UserUserId } from "../../../user/domain/user/user.userId";
import config from "../../../shared/infrastructure/config";

describe("Axios-Service-Integration-Test", () => {
  let video: VideoPrimitive;
  let userSerice: UserService<VideoEntity>;

  beforeAll(() => {
    userSerice = new AxiosService();
  });
  beforeEach(() => {
    video = {
      id: "123",
      name: "Test",
      userId: 1,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
  });

  it("Should get define userService", async () => {
    expect(userSerice).toBeDefined();
    expect(userSerice).toBeInstanceOf(AxiosService);
  });

  it("Should save user's videos", async () => {
    const nockService = nock(
      `http://${config.videoApi.host}:${config.videoApi.port}`,
      {
        allowUnmocked: true,
      }
    );

    nockService["post"]("/video/saveVideo").times(1).reply(200, {
      success: true,
      message: "Video storage",
    });

    const result = await userSerice.saveVideos(
      VideoEntity.objectToEntity(video)
    );

    expect(result).toBeTruthy();
  });

  it("Should throw error with wrong params in the user's videos service", async () => {
    const nockService = nock(
      `http://${config.videoApi.host}:${config.videoApi.port}`,
      {
        allowUnmocked: true,
      }
    );

    nockService["post"]("/video/saveVideo").times(1).reply(400, {
      success: false,
      message: "Video doesn't storage",
    });

    const result = await userSerice.saveVideos(
      VideoEntity.objectToEntity({ ...video, userId: -1 })
    );

    expect(result).toEqual("API_VIDEOS_ERROR: Video doesn't storage");
  });

  it("Should get user's videos", async () => {
    const videos = [
      {
        id: "62eb4780b8a570f37c0cb6b7",
        name: "Recovering",
        userId: 3,
        createdAt: "2022-08-04T04:13:52.326Z",
        updatedAt: "2022-08-04T04:13:52.326Z",
      },
      {
        id: "62fc669ec5994149724b7f1f",
        name: "NewOne",
        userId: 3,
        createdAt: "2022-08-17T03:55:10.182Z",
        updatedAt: "2022-08-17T03:55:10.182Z",
      },
      {
        id: "62fc6fe10f21b2a84152054e",
        name: "Soul",
        userId: 3,
        createdAt: "2022-08-17T04:34:41.440Z",
        updatedAt: "2022-08-17T04:36:35.948Z",
      },
    ];
    const nockService = nock(
      `http://${config.videoApi.host}:${config.videoApi.port}`,
      {
        allowUnmocked: true,
      }
    );

    nockService["get"](`/video/findByUserId?userId=${video.userId}`)
      .times(1)
      .reply(200, {
        success: true,
        videos,
      });
    const videosFound = await userSerice.getVideos(new UserUserId(1));

    expect(videosFound).toBeInstanceOf(Array<VideoEntity>);

    (videosFound as Array<VideoEntity>).forEach((video, index) => {
      const videoPrimitive = video.toPrimitives();

      expect(videoPrimitive).toEqual(videos[index]);
    });
  });

  it("Should throw error when trying to get user's videos", async () => {
    const videos = [
      {
        id: "62eb4780b8a570f37c0cb6b7",
        name: "Recovering",
        userId: 3,
        createdAt: "2022-08-04T04:13:52.326Z",
        updatedAt: "2022-08-04T04:13:52.326Z",
      },
      {
        id: "62fc669ec5994149724b7f1f",
        name: "NewOne",
        userId: 3,
        createdAt: "2022-08-17T03:55:10.182Z",
        updatedAt: "2022-08-17T03:55:10.182Z",
      },
      {
        id: "62fc6fe10f21b2a84152054e",
        name: "Soul",
        userId: 3,
        createdAt: "2022-08-17T04:34:41.440Z",
        updatedAt: "2022-08-17T04:36:35.948Z",
      },
    ];
    const nockService = nock(
      `http://${config.videoApi.host}:${config.videoApi.port}`,
      {
        allowUnmocked: true,
      }
    );

    nockService["get"](`/video/findByUserId?userId=${video.userId}`)
      .times(1)
      .reply(400, {
        success: false,
        message: "Videos not existed",
      });
    const videosFound = await userSerice.getVideos(new UserUserId(-1));

    (videosFound as Array<VideoEntity>).forEach((video, index) => {
      const videoPrimitive = video.toPrimitives();

      expect(videoPrimitive).toEqual("API_VIDEOS_ERROR: Video not existed");
    });
  });

  it("Should update user's videos", async () => {
    const nockService = nock(
      `http://${config.videoApi.host}:${config.videoApi.port}`,
      {
        allowUnmocked: true,
      }
    );

    nockService["get"](`/video/updateVideo/${video.id}`).times(1).reply(200, {
      success: true,
      message: "Videos updated",
    });
    const videoUpdated = await userSerice.updateVideos(
      VideoEntity.objectToEntity({ ...video, name: "Lean", userId: 2 })
    );

    expect(videoUpdated).toBeTruthy();
  });

  it("Should throw error when tring to update user's videos", async () => {
    const nockService = nock(
      `http://${config.videoApi.host}:${config.videoApi.port}`,
      {
        allowUnmocked: true,
      }
    );

    nockService["get"](`/video/updateVideo/${video.id}`).times(1).reply(200, {
      success: true,
      message: "Videos updated",
    });
    const videoUpdated = await userSerice.updateVideos(
      VideoEntity.objectToEntity({ ...video, name: "Lean", userId: -2 })
    );

    expect(videoUpdated).toContain("failed");
  });

  it("Should be false when trying to save user's videos", async () => {
    const newVideo = {
      id: "123",
      name: "Test",
      userId: -1,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    const nockService = nock(
      `http://${config.videoApi.host}:${config.videoApi.port}`,
      {
        allowUnmocked: true,
      }
    );

    nockService["post"]("/video/saveVideo").times(1).reply(200, {
      success: false,
      message: "Video doesn't storage",
    });

    const result = await userSerice.saveVideos(
      VideoEntity.objectToEntity({ ...newVideo, id: "12" })
    );

    expect(result).toBeFalsy();
  });
});
