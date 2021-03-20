import { context, getOctokit } from "@actions/github";
import { getInput, setFailed, setOutput } from "@actions/core";
import { getComment, getUrlFromComment } from "./commentsHelper";

async function run() {
  try {
    const patterns = getInput("pattern").split("\n");
    const gitHubToken = getInput("token");

    const client = getOctokit(gitHubToken);
    const issueNumber = context.payload.pull_request?.number;
    const { data: comments } = await client.issues.listComments({
      ...context.repo,
      issue_number: issueNumber,
    });

    console.error("ISSUE NO", issueNumber);
    console.error("ISSUE PATTERNS", patterns);

    const comment = getComment({ comments, pattern: patterns?.[0] });

    console.error("FOUND COMMENT", comment);
    if (comment) {
      const url = getUrlFromComment(comment);
      console.error("WE HAVE URL", url);
      setOutput("comment_url", url);
    }
  } catch (error) {
    setFailed(error.message);
  }
}

run();
