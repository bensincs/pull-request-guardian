"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTitle = validateTitle;
const log_1 = require("../log");
const TITLE_REGEX = /^(feat|fix|docs|style|refactor|perf|test|chore)(\([a-z0-9-]+\))?: [A-Z].{1,50}$/;
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
