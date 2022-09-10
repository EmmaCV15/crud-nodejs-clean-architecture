import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class ResponseSuccess implements ValueObject<boolean> {
  constructor(private success: boolean) {
    this.validate();
  }

  validate() {
    if (this.success === undefined) {
      throw new Error("Response invalid");
    }
  }

  valueOf(): boolean {
    return this.success;
  }
}
