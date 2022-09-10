import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserCreatedAt implements ValueObject<string> {
  constructor(private createdAt: string) {
    this.validate();
  }

  validate() {
    if (!this.createdAt) {
      throw new Error("User-CreatedAt is not valid");
    }
  }

  valueOf(): string {
    return this.createdAt;
  }
}
