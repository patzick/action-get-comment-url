import { context } from "@actions/github";

export const qwe: boolean = true;

async function run() {
  const { repo, payload } = context;

  const prNumber = payload.pull_request && payload.pull_request.number;
  console.error("ISSUE NO", prNumber);
}
run();
