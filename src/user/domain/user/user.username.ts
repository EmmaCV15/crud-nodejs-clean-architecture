import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserUsername implements ValueObject<string> {
  constructor(private username: string) {
    this.validate();
  }

  validate() {
    if (!this.username) {
      throw new Error("User-Username is not valid");
    }
  }

  valueOf(): string {
    return this.username;
  }
}
