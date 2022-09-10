import { ValueObject } from "../value-objects/value.object";

export class VideoId implements ValueObject<string> {
  constructor(private id: string) {
    this.validate();
  }

  validate() {
    if (this.id == undefined) {
      throw new Error("Video-Id is not valid");
    }
  }

  valueOf(): string {
    return this.id;
  }
}
