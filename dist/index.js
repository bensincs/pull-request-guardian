import * as github from '@actions/github';
import * as core from '@actions/core';

const errors = [];
function logCheck(label, value) {
    core.info(`🔍 ${label}${value ? `: ${value}` : ''}`);
}
function logPass(message) {
    core.info(`✅ ${message}`);
}
function logError(message) {
    errors.push(message);
    core.error(`❌ ${message}`);
}
function failIfErrors() {
    if (errors.length > 0) {
        core.setFailed(`🛡️ Pull Request Guardian found ${errors.length} issue(s):\n- ${errors.join('\n- ')}`);
    }
    else {
        logPass('🚀 Pull Request passed all guardian checks!');
    }
}

const BRANCH_REGEX = /^((feat|fix|docs|style|refactor|perf|test|chore)(\/[a-z0-9-]+)?)$/;
function validateBranch(branch) {
    logCheck('Validating branch name', branch);
    const match = branch.match(BRANCH_REGEX);
    if (!match) {
        logError(`Branch name "${branch}" is invalid. Must match: ${BRANCH_REGEX}`);
        return null;
    }
    logPass(`Branch name "${branch}" is valid.`);
    return match[2]; // e.g. 'feat'
}

const TITLE_REGEX = /^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z0-9-]+\))?: [A-Z].{1,50}$/;
function validateTitle(title) {
    logCheck('Validating PR title', title);
    const match = title.match(TITLE_REGEX);
    if (!match) {
        logError(`PR title "${title}" is invalid. Must match: ${TITLE_REGEX}`);
        return null;
    }
    logPass(`PR title "${title}" is valid.`);
    return match[1]; // e.g. 'feat'
}

function validatePrefixMatch(branchType, titleType) {
    if (!branchType || !titleType)
        return;
    logCheck('Matching prefix', `branch="${branchType}", title="${titleType}"`);
    if (branchType !== titleType) {
        logError(`Prefix mismatch: branch="${branchType}" vs title="${titleType}"`);
    }
    else {
        logPass(`Prefix match: both branch and title are "${branchType}"`);
    }
}

function validateBody(body) {
    logCheck('Validating PR description');
    if (!body || body.trim() === '') {
        logError('PR description (body) is required and cannot be empty.');
    }
    else {
        logPass('PR description is provided.');
    }
}

function run() {
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
