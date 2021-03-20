import { context } from "@actions/github";
import { getInput } from "@actions/core";

export const qwe: boolean = true;

/**
 * Example comment:
 *
 * 💙 shopware-pwa-canary successfully deployed at https://6bc7127fd9bef0a0b08bc14ea427fe5ddd986fde.shopware-pwa-canary.preview.storefrontcloud.io
 */

async function run() {
  const patterns = getInput("patterns").split("\n");

  const { repo, payload } = context;

  const prNumber = payload.pull_request && payload.pull_request.number;
  console.error("ISSUE NO", prNumber);
  console.error("ISSUE PATTERNS", patterns);
}
run();
