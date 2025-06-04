import { logCheck, logError, logPass } from '../log';

const TITLE_REGEX =
  /^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z0-9-]+\))?: [A-Z].{1,50}$/;

export function validateTitle(title: string): string | null {
  logCheck('Validating PR title', title);
  const match = title.match(TITLE_REGEX);
  if (!match) {
    logError(`PR title "${title}" is invalid. Must match: ${TITLE_REGEX}`);
    return null;
  }
  logPass(`PR title "${title}" is valid.`);
  return match[1]; // e.g. 'feat'
}
