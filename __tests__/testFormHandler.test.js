import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing handleSubmit functionality", () => {
  test("handleSubmit is defined", () => {
    expect(handleSubmit).toBeDefined();
  });

  test("handleSubmit is a function", () => {
    expect(typeof handleSubmit).toBe("function");
  });
});
