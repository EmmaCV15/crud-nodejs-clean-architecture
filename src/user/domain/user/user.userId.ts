import { ValueObject } from "../../../shared/domain/value-objects/value.object";

export class UserUserId implements ValueObject<number> {
  constructor(private userId: number) {
    this.validate();
  }

  validate() {
    if (Number(this.userId) == NaN) {
      throw new Error("User-UserId not valid");
    }
  }

  valueOf(): number {
    return this.userId;
  }
}
