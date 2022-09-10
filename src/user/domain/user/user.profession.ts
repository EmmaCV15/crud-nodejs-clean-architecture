import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserProfession implements ValueObject<string> {
  constructor(private profession: string) {
    this.validate();
  }

  validate() {
    if (!this.profession) {
      throw new Error("User-Profession is not valid");
    }
  }

  valueOf(): string {
    return this.profession;
  }
}
