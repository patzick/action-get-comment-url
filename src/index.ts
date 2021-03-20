import { context, getOctokit } from "@actions/github";
import { getInput } from "@actions/core";

async function getCommentsForPattern({ client, pattern, issueNumber }) {
  const { data: comments } = await client.issues.listComments({
    ...context.repo,
    issue_number: issueNumber,
  });
  console.error("comments", comments);
}

/**
 * Example comment:
 *
 * 💙 shopware-pwa-canary successfully deployed at https://6bc7127fd9bef0a0b08bc14ea427fe5ddd986fde.shopware-pwa-canary.preview.storefrontcloud.io
 */

async function run() {
  const patterns = getInput("patterns").split("\n");
  const gitHubToken = getInput("token");

  const client = getOctokit(gitHubToken);

  const { repo, payload } = context;

  const issueNumber = payload.pull_request && payload.pull_request.number;
  console.error("ISSUE NO", issueNumber);
  console.error("ISSUE PATTERNS", patterns);

  await getCommentsForPattern({
    client,
    pattern: patterns?.[0],
    issueNumber,
  });
}
run();
