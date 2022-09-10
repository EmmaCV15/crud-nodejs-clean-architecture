import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserPassword implements ValueObject<string> {
  constructor(private password: string) {
    this.validate();
  }

  validate() {
    if (!this.password) {
      throw new Error("User-Password is not valid");
    }
  }

  valueOf(): string {
    return this.password;
  }
}
