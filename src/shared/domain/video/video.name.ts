import { ValueObject } from "../value-objects/value.object";

export class VideoName implements ValueObject<string> {
  constructor(private name: string) {
    this.validate();
  }

  validate() {
    if (!this.name || this.name.includes("0")) {
      throw new Error("Video-Name is not valid");
    }
  }

  valueOf(): string {
    return this.name;
  }
}
