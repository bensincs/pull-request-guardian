import * as core from '@actions/core';

export function logCheck(label: string, value?: string) {
  core.info(`🔍 ${label}${value ? `: ${value}` : ''}`);
}

export function logPass(message: string) {
  core.info(`✅ ${message}`);
}

export function logError(message: string) {
  core.error(`❌ ${message}`);
}
