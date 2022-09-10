import { validate } from "class-validator";
import { UserDto } from "../controllers/dtos/user.dto";
import { VideoDTO } from "../controllers/dtos/video.dto";

export class RequestAdapter {
  public async build(request: UserDto): Promise<UserDto> {
    if (request == undefined) {
      throw new Error("Send the correct data");
    }

    if (
      !request.name ||
      !request.age ||
      !request.profession ||
      !request.username ||
      !request.password
    ) {
      throw new Error("All information is required");
    }

    const errors = await validate(request);

    if (errors.length > 0) {
      throw new Error("Send the correct data");
    }
    return request;
  }
  public async buildVideos(request: VideoDTO): Promise<VideoDTO> {
    if (request == undefined) {
      throw new Error("Send the correct data");
    }

    if (!request.name || !request.userId)
      throw new Error("All information is required");

    const errors = await validate(request);

    if (errors.length > 0) {
      throw new Error("Send the correct data");
    }
    return request;
  }
}
