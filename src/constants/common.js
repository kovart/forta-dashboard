export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
export const FORTA_API_URL = process.env.FORTA_API_URL;
export const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;

export const PROJECT_NAME = 'Forta Dashboard';

export const SESSION_KEY = '__session__';

export const SYSTEM_DATE_FORMAT = 'YYYY-MM-DD';
export const APP_DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${TIME_FORMAT} ${SYSTEM_DATE_FORMAT}`;
export const DATE_TIME_FORMAT_SHORT = `${TIME_FORMAT} ${APP_DATE_FORMAT}`;

export const DASHBOARD_MODE = {
  list: 'LIST',
  groups: 'GROUPS'
};

export const DASHBOARD_MODE_NAMES = {
  [DASHBOARD_MODE.list]: 'All alerts',
  [DASHBOARD_MODE.groups]: 'Group mode'
};

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
  info: 'INFO', // Miscellaneous behaviours worth describing,
  unknown: 'UNKNOWN'
};

export const CHAIN = {
  mainnet: 1,
  polygon: 137,
  bsc: 56,
  avalanche: 43114,
  arbitrium: 42161,
  optimism: 10,
  fantom: 250
};

export const CHAIN_NAMES = {
  [CHAIN.mainnet]: 'Mainnet',
  [CHAIN.polygon]: 'Polygon',
  [CHAIN.bsc]: 'BSC',
  [CHAIN.avalanche]: 'Avalanche',
  [CHAIN.arbitrium]: 'Arbitrium',
  [CHAIN.optimism]: 'Optimism',
  [CHAIN.fantom]: 'Fantom'
};

export const CHAIN_RPC_URL = {
  [CHAIN.mainnet]: MAINNET_RPC_URL
};
