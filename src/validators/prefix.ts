import { logCheck, logError, logPass } from '../log';

export function validatePrefixMatch(branchType: string | null, titleType: string | null): void {
  logCheck('Matching prefix', `branch="${branchType}", title="${titleType}"`);
  if (branchType !== titleType) {
    logError(`Prefix mismatch: branch="${branchType}" vs title="${titleType}"`);
  } else {
    logPass(`Prefix match: both branch and title are "${branchType}"`);
  }
}
