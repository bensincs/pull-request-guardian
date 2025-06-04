import * as core from '@actions/core';

const errors: string[] = [];

export function logCheck(label: string, value?: string) {
  core.info(`🔍 ${label}${value ? `: ${value}` : ''}`);
}

export function logPass(message: string) {
  core.info(`✅ ${message}`);
}

export function logError(message: string) {
  errors.push(message);
  core.error(`❌ ${message}`);
}

export function failIfErrors(): void {
  if (errors.length > 0) {
    core.setFailed(
      `Pull Request Guardian found ${errors.length} issue(s):\n- ${errors.join('\n- ')}`,
    );
  } else {
    logPass('Pull Request passed all guardian checks!');
  }
}
