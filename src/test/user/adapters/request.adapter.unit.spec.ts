import { RequestAdapter } from "../../../user/infrastructure/adapters/request.adapter";

describe("Global-Functions-Unit-Test", () => {
  let requestAdapter: RequestAdapter;

  beforeEach(() => {
    requestAdapter = new RequestAdapter();
  });
  it("Should get a defined class", () => {
    expect(RequestAdapter).toBeDefined();
  });

  it("Should throw data with undefined request", async () => {
    const result = await requestAdapter
      .build(undefined as any)
      .catch((error) => error.toString());

    expect(result).toContain("Send the correct data");
  });

  it("Should includes all the information", async () => {
    const user = {
      name: "Emmanuel",
      age: 22,
      username: "EmmaCV15",
      password: "emma123",
    };
    const result = await requestAdapter
      .build(user as any)
      .catch((error) => error.toString());

    expect(result).toContain("All information is required");
  });

  it("Should Validate the information", async () => {
    const user = {
      name: "Edgar",
      age: 22,
      profession: "Engineer",
      username: "EdgarVega",
      password: "vega123",
    };
    const result = await requestAdapter.build(user as any);

    expect(result).toEqual(user);
  });
});
