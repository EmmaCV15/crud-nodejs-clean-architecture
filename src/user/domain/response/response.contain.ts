import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class ResponseContain implements ValueObject<object> {
  constructor(private contain: object) {
    this.validate();
  }

  validate() {
    if (!this.contain) {
      throw new Error("Contain invalid");
    }
  }

  valueOf(): object {
    return this.contain;
  }
}
