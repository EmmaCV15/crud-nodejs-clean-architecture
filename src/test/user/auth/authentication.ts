export const addHeaders = (request: any) =>
  request.set("Content-Type", "application/json").timeout(30000);
