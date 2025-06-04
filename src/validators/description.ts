import { logCheck, logError, logPass } from '../log';

export function validateBody(body: string | undefined): void {
  logCheck('Validating PR description');
  if (!body || body.trim() === '') {
    logError('PR description (body) is required and cannot be empty.');
  } else {
    logPass('PR description is provided.');
  }
}
