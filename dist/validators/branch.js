"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBranch = validateBranch;
const log_1 = require("../log");
const BRANCH_REGEX = /^((feat|fix|docs|style|refactor|perf|test|chore)(\/[a-z0-9-]+)?)$/;
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
