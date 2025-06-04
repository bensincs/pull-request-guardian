import * as github from '@actions/github';
import { failIfErrors, logError } from './log';
import { validateBranch } from './validators/branch';
import { validateTitle } from './validators/title';
import { validatePrefixMatch } from './validators/prefix';
import { validateBody } from './validators/description';

function run(): void {
  const pr = github.context.payload.pull_request;
  if (!pr) {
    logError('This action must be triggered by a pull_request event.');
    failIfErrors();
    return;
  }

  const branch = github.context.ref.replace('refs/heads/', '');
  const title = pr.title;
  const body = pr.body;

  const branchType = validateBranch(branch);
  const titleType = validateTitle(title);

  validatePrefixMatch(branchType, titleType);
  validateBody(body);

  failIfErrors();
}

run();
