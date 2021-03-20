import { getUrlFromComment } from "../commentsHelper";
import { exampleShopwarePwaComment, exampleVercelComment } from "./testHelper";

describe("getUrlFromComment", () => {
  it("should fallback when comment does not exist", () => {
    const result = getUrlFromComment(undefined);
    expect(result).toBeUndefined();
  });

  it("should fallback when comment has no body", () => {
    const result = getUrlFromComment({});
    expect(result).toBeUndefined();
  });

  it("should get the first url from the comment by default", () => {
    const result = getUrlFromComment(exampleVercelComment);
    expect(result).toEqual("https://vercel.link/github-learn-more");

    const shopwarePwaResult = getUrlFromComment(exampleShopwarePwaComment);
    expect(shopwarePwaResult).toEqual(
      "https://qwe.shopware-pwa-canary.preview.storefrontcloud.io"
    );
  });

  it("should get the 4. url from the comment", () => {
    const result = getUrlFromComment(exampleVercelComment, { index: 4 });
    expect(result).toEqual("https://expected-link.vercel.app");
  });
});
