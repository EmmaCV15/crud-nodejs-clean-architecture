import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserId implements ValueObject<string> {
  constructor(private id: string) {
    this.validate();
  }

  validate() {
    if (!this.id) {
      throw new Error("User-ID is not valid");
    }
  }

  valueOf(): string {
    return this.id;
  }
}
