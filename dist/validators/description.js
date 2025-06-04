"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
const log_1 = require("../log");
function validateBody(body) {
    (0, log_1.logCheck)('Validating PR description');
    if (!body || body.trim() === '') {
        (0, log_1.logError)('PR description (body) is required and cannot be empty.');
    }
    else {
        (0, log_1.logPass)('PR description is provided.');
    }
}
