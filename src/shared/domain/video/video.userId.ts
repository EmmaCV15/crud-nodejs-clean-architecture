import { ValueObject } from "../value-objects/value.object";

export class VideoUserId implements ValueObject<number> {
  constructor(private userId: number) {
    this.validate();
  }

  validate() {
    if (isNaN(Number(this.userId))) {
      throw new Error("Video-UserId is not valid");
    }
  }

  valueOf(): number {
    return this.userId;
  }
}
