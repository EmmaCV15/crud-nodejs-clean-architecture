import { Entity } from "../../../shared/domain/entities/entity";
import { ResponseContain } from "./response.contain";
import { ResponseStatus } from "./response.status";
import { ResponseSuccess } from "./response.success";

export type ResponsePrimitive = ReturnType<Response["toPrimitives"]>;

export class Response extends Entity {
  constructor(
    private success: ResponseSuccess,
    private status: ResponseStatus,
    private contain: ResponseContain
  ) {
    super();
  }

  static fromPrimitives(succes: boolean, status: number, contain: object) {
    return new Response(
      new ResponseSuccess(succes),
      new ResponseStatus(status),
      new ResponseContain(contain)
    );
  }

  toPrimitives() {
    return {
      success: this.success.valueOf(),
      status: this.status.valueOf(),
      contain: this.contain.valueOf(),
    };
  }
}
