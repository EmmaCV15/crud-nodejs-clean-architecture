import { GlobalFunctions } from "../../../user/infrastructure/utils/global.function";

describe("Global-Functions-Unit-Test", () => {
  let user: any;
  let password: string = "";
  let passwordEncrypted: string = "";

  beforeEach(() => {
    user = {
      id: 1,
      name: "Edgar",
      age: 22,
      subjects: ["math", "english"],
    };
  });

  it("Should get a define class", () => {
    expect(GlobalFunctions).toBeDefined();
  });

  it("Should get the correct data without some params", () => {
    const result = GlobalFunctions.getNewParams(user, ["subjects", "age"]);
    expect(result).toEqual({
      id: 1,
      name: "Edgar",
    });
  });

  it("Should get the correct data without some params using the validateProperties feature", () => {
    delete user.id;

    const result = GlobalFunctions.getNewParams(
      user,
      ["subjects", "age"],
      ["id", "name"]
    );

    expect(result).toEqual({
      id: 0,
      name: "Edgar",
    });
  });

  it("Should encrypt the password", async () => {
    password = "vega123";

    passwordEncrypted = await GlobalFunctions.encrypt(password, 10);

    expect(passwordEncrypted).toBeDefined();
    expect(typeof passwordEncrypted).toEqual("string");
  });

  it("verifyEncrypValues", async () => {
    const generalResult = await GlobalFunctions.verifyEncrypValues(
      password,
      passwordEncrypted
    );

    expect(generalResult).toBeTruthy();
  });
});
