import { ValueObject } from "../value-objects/value.object";

export class VideoCreatedAt implements ValueObject<string> {
  constructor(private createdAt: string) {
    this.validate();
  }

  validate() {
    if (!this.createdAt) {
      throw new Error("Video-CreatedAt is not valid");
    }
  }

  valueOf(): string {
    return this.createdAt;
  }
}
