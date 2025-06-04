import * as github from '@actions/github';
import { logError } from './log';
import { getInput, setFailed } from '@actions/core';
import PullRequestHelper from './service';
import { PullRequestValidator } from './validator';

async function run(): Promise<void> {
  const token = getInput('github_token', { required: true });
  const pr = github.context.payload.pull_request;
  const repo = github.context.repo;
  if (!pr) {
    const errorMessage = 'This action must be triggered by a pull_request event.';
    logError(errorMessage);
    setFailed(errorMessage);
    return;
  }
  if (!repo.owner || !repo.repo) {
    const errorMessage = 'Repository owner or name is missing in the context.';
    logError(errorMessage);
    setFailed(errorMessage);
    return;
  }

  // HAPPY TO START THE JOB NOW :)

  const helper = new PullRequestHelper(token, repo.owner, repo.repo, pr.number);

  const validator = new PullRequestValidator(pr);
  validator.validateBranch();
  validator.validateTitle();
  validator.validateBody();

  if (validator.getErrors().length > 0) {
    const errorMessage = `Validation failed with the following errors:\n${validator.getErrors().join('\n')}`;
    helper.commentOnPR(errorMessage);
    setFailed(errorMessage);
    return;
  }
}

await run();
