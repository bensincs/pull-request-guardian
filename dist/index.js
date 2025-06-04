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
const branch_1 = require("./validators/branch");
const title_1 = require("./validators/title");
const prefix_1 = require("./validators/prefix");
const description_1 = require("./validators/description");
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
    const branchType = (0, branch_1.validateBranch)(branch);
    const titleType = (0, title_1.validateTitle)(title);
    (0, prefix_1.validatePrefixMatch)(branchType, titleType);
    (0, description_1.validateBody)(body);
    (0, log_1.failIfErrors)();
}
run();
