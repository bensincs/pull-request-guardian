"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const github = __importStar(require("@actions/github"));
const log_1 = require("./log");
const BRANCH_REGEX = /^((feat|fix|docs|style|refactor|perf|test|chore)(\/[a-z0-9-]+)?)$/;
const TITLE_REGEX = /^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z0-9-]+\))?: [A-Z].{1,50}$/;
function validateBranch(branch) {
    (0, log_1.logCheck)('Validating branch name', branch);
    const match = branch.match(BRANCH_REGEX);
    if (!match) {
        (0, log_1.logError)(`Branch name "${branch}" is invalid. Must match: ${BRANCH_REGEX}`);
        return null;
    }
    (0, log_1.logPass)(`Branch name "${branch}" is valid.`);
    return match[2]; // e.g. 'feat'
}
function validateTitle(title) {
    (0, log_1.logCheck)('Validating PR title', title);
    const match = title.match(TITLE_REGEX);
    if (!match) {
        (0, log_1.logError)(`PR title "${title}" is invalid. Must match: ${TITLE_REGEX}`);
        return null;
    }
    (0, log_1.logPass)(`PR title "${title}" is valid.`);
    return match[1]; // e.g. 'feat'
}
function validatePrefixMatch(branchType, titleType) {
    if (!branchType || !titleType)
        return;
    (0, log_1.logCheck)('Matching prefix', `branch="${branchType}", title="${titleType}"`);
    if (branchType !== titleType) {
        (0, log_1.logError)(`Prefix mismatch: branch="${branchType}" vs title="${titleType}"`);
    }
    else {
        (0, log_1.logPass)(`Prefix match: both branch and title are "${branchType}"`);
    }
}
function validateBody(body) {
    (0, log_1.logCheck)('Validating PR description');
    if (!body || body.trim() === '') {
        (0, log_1.logError)('PR description (body) is required and cannot be empty.');
    }
    else {
        (0, log_1.logPass)('PR description is provided.');
    }
}
function run() {
    const pr = github.context.payload.pull_request;
    if (!pr) {
        (0, log_1.logError)('This action must be triggered by a pull_request event.');
        (0, log_1.failIfErrors)();
        return;
    }
    const branch = github.context.ref.replace('refs/heads/', '');
    const title = pr.title;
    const body = pr.body;
    const branchType = validateBranch(branch);
    const titleType = validateTitle(title);
    validatePrefixMatch(branchType, titleType);
    validateBody(body);
    (0, log_1.failIfErrors)();
}
run();
