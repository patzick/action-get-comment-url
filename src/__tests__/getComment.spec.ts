import { getComment } from "../commentsHelper";
import { exampleVercelComment } from "./testHelper";

describe("getComment", () => {
  it("should return undefined when there are no comments", () => {
    const comments = [];
    const pattern = "";
    const result = getComment({ comments, pattern });
    expect(result).toBeUndefined();
  });

  it("should return undefined when there are no comments", () => {
    const comments = undefined;
    const pattern = "";
    const result = getComment({ comments, pattern });
    expect(result).toBeUndefined();
  });

  it("should return first comment from pattern", () => {
    const comments: any = [
      exampleVercelComment,
      {
        body: "some comment",
      },
    ];
    const pattern = "";
    const result = getComment({ comments, pattern });
    expect(result).toEqual(comments[0]);
  });

  it("should return comment from pattern", () => {
    const comments: any = [
      exampleVercelComment,
      {
        body: "some comment",
      },
    ];
    const pattern = "some com";
    const result = getComment({ comments, pattern });
    expect(result).toEqual(comments[1]);
  });
});
