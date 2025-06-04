import * as github from '@actions/github';
import { failIfErrors, logError } from './log';
import { validateBranch } from './validators/branch';
import { context } from '@actions/github';
import { getInput } from '@actions/core';
import { validateTitle } from './validators/title';
import { validatePrefixMatch } from './validators/prefix';
import { validateBody } from './validators/description';
import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';

const token = getInput('github_token', { required: true });
const octokit = new Octokit({ auth: token, request: { fetch: fetch } });

async function run(): Promise<void> {
  const pr = github.context.payload.pull_request;
  if (!pr) {
    logError('This action must be triggered by a pull_request event.');
    failIfErrors();
    return;
  }

  await octokit.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pr.number,
    body: 'Thanks for your PR! 🚀',
  });

  const branch = github.context.payload.pull_request?.head.ref;
  const title = pr.title;
  const body = pr.body;

  const branchType = validateBranch(branch);
  const titleType = validateTitle(title);

  validatePrefixMatch(branchType, titleType);
  validateBody(body);

  failIfErrors();
}

await run();
