import { ValueObject } from "../value-objects/value.object";

export class VideoUpdatedAt implements ValueObject<string> {
  constructor(private updatedAt: string) {
    this.validate();
  }

  validate() {
    if (!this.updatedAt) {
      throw new Error("Video-UpdatedAt is not valid");
    }
  }

  valueOf(): string {
    return this.updatedAt;
  }
}
