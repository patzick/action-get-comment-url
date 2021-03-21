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
  const urlIndex = Number(getInput("index")) || 1;

  const client = getOctokit(gitHubToken);
  const issueNumber = context.payload.pull_request?.number;

  let settings = {
    pattern: patterns?.[0],
    index: urlIndex,
  };
  // overwrite pattern and index when `platform` is provided
  if (platform) {
    console.info(
      "Platform param is provided. Pattern and index params are ignored."
    );
    settings = getPlatformPattern(platform);
  }

  const comments = await fetchComments({ client, issueNumber });
  const comment = getComment({ comments, pattern: settings.pattern });

  if (comment) {
    console.info("Comment found");
    const url = getUrlFromComment(comment, { index: settings.index });
    console.info("Extracted URL", url);
    setOutput("comment_url", url);
    setOutput("found_url", !!url);
    return;
  }
  setOutput("found_url", false);
}

async function run() {
  try {
    await execute();
  } catch (error) {
    setFailed(`[action-get-comment-url] ${error.message}`);
  }
}

run();
