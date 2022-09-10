import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserAge implements ValueObject<number> {
  constructor(private age: number) {
    this.validate();
  }

  validate() {
    if (isNaN(Number(this.age))) {
      throw new Error("User-Age is not valid");
    }
  }

  valueOf(): number {
    return this.age;
  }
}
