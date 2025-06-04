// src/validators/validator.ts
import { WebhookPayload } from '@actions/github/lib/interfaces';
import { logCheck, logError, logPass } from './log';

export class PullRequestValidator {
  private errors: string[] = [];
  private pullRequest: WebhookPayload['pull_request'];

  constructor(pullRequest: WebhookPayload['pull_request']) {
    this.pullRequest = pullRequest;
    if (!pullRequest) {
      this.addError('Pull request data is missing.');
    }
  }

  private addError(message: string): void {
    this.errors.push(message);
    logError(message);
  }

  getErrors(): string[] {
    return this.errors;
  }

  validateBranch(): string | null {
    if (!this.pullRequest) return null;
    const BRANCH_REGEX = /^((feat|fix|docs|style|refactor|perf|test|chore)(\/[a-z0-9-]+)?)$/;
    const branch = this.pullRequest.head?.ref;
    if (!branch) {
      this.addError('Branch name is missing.');
      return null;
    }
    logCheck('Validating branch name', branch);
    const match = branch.match(BRANCH_REGEX);
    if (!match) {
      this.addError(`Branch name "${branch}" is invalid. Must match: ${BRANCH_REGEX}`);
      return null;
    }
    logPass(`Branch name "${branch}" is valid.`);
    return match[2];
  }

  validateTitle(): string | null {
    if (!this.pullRequest) return null;
    const TITLE_REGEX =
      /^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z0-9-]+\))?: .{1,50}$/;
    const title = this.pullRequest.title;
    if (!title) {
      this.addError('PR title is missing.');
      return null;
    }
    logCheck('Validating PR title', title);
    const match = title.match(TITLE_REGEX);
    if (!match) {
      this.addError(`PR title "${title}" is invalid. Must match: ${TITLE_REGEX}`);
      return null;
    }
    logPass(`PR title "${title}" is valid.`);
    return match[1];
  }

  validateBody(): void {
    if (!this.pullRequest) return;
    const body = this.pullRequest.body;
    logCheck('Validating PR description');
    if (!body || body.trim() === '') {
      this.addError('PR description (body) is required and cannot be empty.');
      return;
    }
    logPass('PR description is provided.');
  }
}
