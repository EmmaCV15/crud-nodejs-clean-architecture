import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserName implements ValueObject<string> {
  constructor(private name: string) {
    this.validate();
  }

  validate() {
    if (!this.name || this.name.includes("0")) {
      throw new Error("User-Name is not valid");
    }
  }

  valueOf(): string {
    return this.name;
  }
}
