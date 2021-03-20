import { context } from "@actions/github";
import { getInput } from "@actions/core";

export const qwe: boolean = true;

async function run() {
  const patterns = getInput("patterns")

  const { repo, payload } = context;

  const prNumber = payload.pull_request && payload.pull_request.number;
  console.error("ISSUE NO", prNumber);
  console.error("ISSUE PATTERNS", patterns);
}
run();
