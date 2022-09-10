import bcrypt from "bcrypt";

export class GlobalFunctions {
  private constructor() {}

  static getNewParams(
    obj: any,
    properties: Array<string>,
    validateProperties?: Array<string>
  ) {
    const newObj: any = {};

    const realProperties: Array<string> = Object.keys(
      validateProperties
        ? GlobalFunctions.cleanAllParams(obj, validateProperties)
        : obj
    ); //{id: 2, name: "E"} => ["id","name"]

    realProperties.forEach((property: string) => {
      if (!properties.find((prop) => prop == property)) {
        const value = obj[property];
        newObj[property] =
          typeof value == "object" ? Object.assign(obj[property]) : value;
      }
    });

    return newObj;
  }

  private static cleanAllParams(
    obj: any,
    validateProperties: Array<string>
  ): any {
    validateProperties.forEach((property) => {
      obj[property] = obj[property] || 0;
    });

    return obj;
  }

  static async encrypt(toEncrypt: string, saltRounds: number): Promise<string> {
    const newEncriptValue = await bcrypt.hash(toEncrypt, saltRounds);
    return newEncriptValue;
  }

  static async verifyEncrypValues(
    normalValue: string,
    encryptValue: string
  ): Promise<boolean> {
    const verifyValues = await bcrypt.compare(normalValue, encryptValue);
    return verifyValues;
  }
}
