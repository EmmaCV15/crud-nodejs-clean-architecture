export interface SecurityJwt {
  sign(data: object): Promise<string | object>;
  verify(token: string): Promise<string | any>;
}
