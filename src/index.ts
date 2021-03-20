import { context, getOctokit } from "@actions/github";
import { getInput, setFailed, setOutput } from "@actions/core";
import { getComment, getUrlFromComment } from "./commentsHelper";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types";

async function fetchComments({
  client,
  issueNumber,
}): Promise<
  RestEndpointMethodTypes["issues"]["listComments"]["response"]["data"]
> {
  try {
    const { data: comments } = await client.issues.listComments({
      ...context.repo,
      issue_number: issueNumber,
    });
    return comments;
  } catch (error) {
    console.warn("No issues found for issue: " + issueNumber);
    return [];
  }
}

async function execute() {
  const patterns = getInput("pattern").split("\n");
  const gitHubToken = getInput("token");

  const client = getOctokit(gitHubToken);
  const issueNumber = context.payload.pull_request?.number;

  console.error("ISSUE NO", issueNumber);
  console.error("ISSUE PATTERNS", patterns);

  const comments = await fetchComments({ client, issueNumber });

  const comment = getComment({ comments, pattern: patterns?.[0] });

  console.error("FOUND COMMENT", comment);
  if (comment) {
    const url = getUrlFromComment(comment);
    console.error("WE HAVE URL", url);
    setOutput("comment_url", url);
  }
}

async function run() {
  try {
    await execute();
  } catch (error) {
    setFailed(`[action-get-comment-url] ${error.message}`);
  }
}

run();
