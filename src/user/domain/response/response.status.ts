import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class ResponseStatus implements ValueObject<number> {
  constructor(private status: number) {
    this.validate();
  }

  validate() {
    if (!this.status) {
      throw new Error("Status invalid");
    }
  }

  valueOf(): number {
    return this.status;
  }
}
