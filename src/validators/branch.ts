import { logCheck, logError, logPass } from '../log';

const BRANCH_REGEX = /^((feat|fix|docs|style|refactor|perf|test|chore)(\/[a-z0-9-]+)?)$/;

export function validateBranch(branch: string): string | null {
  logCheck('Validating branch name', branch);
  const match = branch.match(BRANCH_REGEX);
  if (!match) {
    logError(`Branch name "${branch}" is invalid. Must match: ${BRANCH_REGEX}`);
    return null;
  }
  logPass(`Branch name "${branch}" is valid.`);
  return match[2]; // e.g. 'feat'
}
