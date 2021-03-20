import { context, getOctokit } from "@actions/github";
import { getInput, setFailed } from "@actions/core";

/**
 * Example comment:
 *
 * 💙 shopware-pwa-canary successfully deployed at https://6bc7127fd9bef0a0b08bc14ea427fe5ddd986fde.shopware-pwa-canary.preview.storefrontcloud.io
 */

async function run() {
  try {
    const patterns = getInput("patterns").split("\n");
    const gitHubToken = getInput("token");

    const client = getOctokit(gitHubToken);
    const issueNumber = context.payload.pull_request?.number;
    const { data: comments } = await client.issues.listComments({
      ...context.repo,
      issue_number: issueNumber,
    });

    console.error("ISSUE NO", issueNumber);
    console.error("ISSUE PATTERNS", patterns);

    const comment = comments.find(({ body }) => body.includes(patterns?.[0]));

    console.error("FOUND COMMENT", comment);
    // await getCommentsForPattern({
    //   comments,
    //   pattern: patterns?.[0],
    // });
  } catch (error) {
    setFailed(error.message);
  }
}

run();
