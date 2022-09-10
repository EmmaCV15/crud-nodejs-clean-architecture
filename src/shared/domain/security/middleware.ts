export interface SecurityMiddleware {
  isAuth(req: Object, res: Object, next: Function): Promise<any>;
}
