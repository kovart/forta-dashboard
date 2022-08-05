export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
export const FORTA_API_URL = process.env.FORTA_API_URL;

export const PROJECT_NAME = 'Forta Dashboard';

export const SESSION_KEY = '__session__';

export const DATE_FORMAT = 'DD/MM/YY';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT}, ${TIME_FORMAT}`;

export const FINDING = {
  unknown: 'UNKNOWN_TYPE',
  exploit: 'EXPLOIT',
  suspicious: 'SUSPICIOUS',
  degraded: 'DEGRADED',
  info: 'INFO'
};

export const SEVERITY = {
  critical: 'CRITICAL', // Exploitable vulnerabilities, massive impact on users/funds
  high: 'HIGH', // Exploitable under more specific conditions, significant impact on users/funds
  medium: 'MEDIUM', // Notable unexpected behaviours, moderate to low impact on users/funds
  low: 'LOW', // Minor oversights, negligible impact on users/funds
  info: 'INFO' // Miscellaneous behaviours worth describing
};
