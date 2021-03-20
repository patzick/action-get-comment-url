import { validatePlatform } from "../platform";

describe("validatePlatform", () => {
  it("should accept empty platform input", () => {
    const result = validatePlatform("");
    expect(result).toBeUndefined();

    const undefinedResult = validatePlatform(undefined);
    expect(undefinedResult).toBeUndefined();
  });

  it("should return platform for vercel", () => {
    const result = validatePlatform("Vercel");
    expect(result).toEqual("vercel");
  });

  it("should return platform for netlify", () => {
    const result = validatePlatform("Netlify");
    expect(result).toEqual("netlify");
  });

  it("should return platform for storefrontcloud", () => {
    const result = validatePlatform("StorefrontCloud");
    expect(result).toEqual("storefrontcloud");
  });

  it("should throw an exception on unknown type", () => {
    expect(() => validatePlatform("something")).toThrow(
      "Unknown platform input: something"
    );
  });
});
