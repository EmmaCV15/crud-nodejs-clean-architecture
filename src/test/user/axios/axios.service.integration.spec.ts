import { UserService } from "../../../user/domain/services/user.service";
import {
  VideoEntity,
  VideoPrimitive,
} from "../../../shared/domain/video/video.aggregate";
import { AxiosService } from "../../../user/infrastructure/services/axios.service";
import { UserUserId } from "../../../user/domain/user/user.userId";

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
    const result = await userSerice.saveVideos(
      VideoEntity.objectToEntity(video)
    );

    expect(result).toBeTruthy();
  });

  it("Should get user's videos", async () => {
    const videoFound = await userSerice.getVideos(new UserUserId(1));

    expect(videoFound).toBeInstanceOf(Array<VideoEntity>);

    (videoFound as Array<VideoEntity>).forEach((video) => {
      const videoPrimitive = video.toPrimitives();

      expect(videoPrimitive.id).toBeDefined();
      expect(videoPrimitive.name).toBeDefined();
      expect(videoPrimitive.userId).toEqual(1);
      expect(videoPrimitive.createdAt).toBeDefined();
      expect(videoPrimitive.updatedAt).toBeDefined();
    });
  });

  it("Should update user's videos", async () => {});
});
