import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserUpdatedAt implements ValueObject<string> {
  constructor(private updatedAt: string) {
    this.validate();
  }

  validate() {
    if (!this.updatedAt) {
      throw new Error("User-UpdatedAt is not valid");
    }
  }

  valueOf(): string {
    return this.updatedAt;
  }
}
