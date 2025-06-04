"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePrefixMatch = validatePrefixMatch;
const log_1 = require("../log");
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
