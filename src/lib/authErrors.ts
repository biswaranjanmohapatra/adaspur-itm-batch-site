type AuthOperation = 'login' | 'registration' | 'password reset';

type ErrorDetails = {
  message?: unknown;
  status?: unknown;
  code?: unknown;
  name?: unknown;
};

function getErrorDetails(error: unknown): ErrorDetails {
  if (typeof error === 'object' && error !== null) {
    return error as ErrorDetails;
  }
  return { message: error };
}

export function getAuthErrorMessage(error: unknown, operation: AuthOperation): string {
  const details = getErrorDetails(error);
  const message = typeof details.message === 'string' ? details.message : '';
  const normalized = message.toLowerCase();
  const code = typeof details.code === 'string' ? details.code : '';

  if (
    code === '23505' ||
    /registration number.*(already|use|exist)|registered_students_registration_number_key/.test(normalized)
  ) {
    return 'This registration number is already registered. Please contact your batch administrator.';
  }

  if (/already registered|user already exists/.test(normalized)) {
    return 'This email is already registered. Please sign in instead.';
  }

  if (/failed to fetch|network|timeout|load failed|internet connection/.test(normalized) || details.name === 'AuthRetryableFetchError') {
    return 'Connection problem. Check your internet connection and try again.';
  }

  const status = typeof details.status === 'number' ? details.status : 0;
  if (status >= 500 || /database error saving new user|internal server error/.test(normalized)) {
    return 'The service is temporarily unavailable. Please try again shortly.';
  }

  if (operation === 'login' && /invalid login credentials|invalid credentials|email not confirmed/.test(normalized)) {
    return normalized.includes('email not confirmed')
      ? 'Please confirm your email using the link we sent before signing in.'
      : 'Email or password is incorrect.';
  }

  if (/registration number is invalid|outside the allowed student range|valid 10-digit mobile number|student name is required/.test(normalized)) {
    return message;
  }

  if (operation === 'login') return 'We could not sign you in. Check your details and try again.';
  if (operation === 'registration') return 'We could not complete registration. Check your details and try again.';
  return 'We could not send the reset email. Please try again.';
}