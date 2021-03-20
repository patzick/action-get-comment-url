import { context, getOctokit } from "@actions/github";
import { getInput, setFailed, setOutput } from "@actions/core";
import { getComment, getUrlFromComment } from "./commentsHelper";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types";
import { getPlatformPattern, validatePlatform } from "./platform";

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
    console.warn("No issues found for id: " + issueNumber);
    return [];
  }
}

async function execute() {
  const gitHubToken = getInput("token");
  const platform = validatePlatform(getInput("platform"));
  const patterns = getInput("pattern").split("\n");

  const client = getOctokit(gitHubToken);
  const issueNumber = context.payload.pull_request?.number;

  console.error("ISSUE NO", issueNumber);
  console.error("ISSUE PATTERNS", patterns);
  console.error("Platform", platform);

  let settings = {
    pattern: patterns?.[0],
    index: 1,
  };
  if (platform) {
    settings = getPlatformPattern(platform);
  }

  const comments = await fetchComments({ client, issueNumber });

  const comment = getComment({ comments, pattern: settings.pattern });

  console.error("FOUND COMMENT", comment);
  setOutput("found_url", false);
  if (comment) {
    const url = getUrlFromComment(comment, { index: settings.index });
    console.error("WE HAVE URL", url);
    setOutput("comment_url", url);
    setOutput("found_url", !!url);
    return;
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
