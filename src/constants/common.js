export const FORTA_API_URL = process.env.FORTA_API_URL;
export const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
export const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL;
export const BSC_RPC_URL = process.env.BSC_RPC_URL;
export const AVALANCHE_RPC_URL = process.env.AVALANCHE_RPC_URL;
export const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL;
export const OPTIMISM_RPC_URL = process.env.OPTIMISM_RPC_URL;
export const FANTOM_RPC_URL = process.env.FANTOM_RPC_URL;

export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
export const HOMEPAGE = process.env.HOMEPAGE;

export const PROJECT_NAME = 'Forta Dashboard';

export const DB_VERSION = 1;
export const DB_NAME = 'forta-explorer';

export const SYSTEM_DATE_FORMAT = 'YYYY-MM-DD';
export const APP_DATE_FORMAT = 'DD/MM/YYYY';

export const FINDING = {
  unknown: 'UNKNOWN_TYPE',
  exploit: 'EXPLOIT',
  suspicious: 'SUSPICIOUS',
  degraded: 'DEGRADED',
  info: 'INFO'
};

// the order is important
export const SEVERITY = {
  critical: 'CRITICAL', // Exploitable vulnerabilities, massive impact on users/funds
  high: 'HIGH', // Exploitable under more specific conditions, significant impact on users/funds
  medium: 'MEDIUM', // Notable unexpected behaviours, moderate to low impact on users/funds
  low: 'LOW', // Minor oversights, negligible impact on users/funds
  info: 'INFO', // Miscellaneous behaviours worth describing,
  unknown: 'UNKNOWN'
};

export const CHAIN = {
  mainnet: '1',
  polygon: '137',
  bsc: '56',
  avalanche: '43114',
  arbitrium: '42161',
  optimism: '10',
  fantom: '250'
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
  [CHAIN.mainnet]: MAINNET_RPC_URL,
  [CHAIN.polygon]: POLYGON_RPC_URL,
  [CHAIN.bsc]: BSC_RPC_URL,
  [CHAIN.avalanche]: AVALANCHE_RPC_URL,
  [CHAIN.arbitrium]: ARBITRUM_RPC_URL,
  [CHAIN.optimism]: OPTIMISM_RPC_URL,
  [CHAIN.fantom]: FANTOM_RPC_URL
};

import EthereumImage from '@assets/images/chains/ethereum.jpg';
import ArbirtrumImage from '@assets/images/chains/arbitrum.jpg';
import AvalancheImage from '@assets/images/chains/avalanche.jpg';
import BscImage from '@assets/images/chains/bsc.jpg';
import FantomImage from '@assets/images/chains/fantom.jpg';
import OptimismImage from '@assets/images/chains/optimism.jpg';
import PolygonImage from '@assets/images/chains/polygon.jpg';

export const CHAIN_IMAGE = {
  [CHAIN.mainnet]: EthereumImage,
  [CHAIN.arbitrium]: ArbirtrumImage,
  [CHAIN.avalanche]: AvalancheImage,
  [CHAIN.bsc]: BscImage,
  [CHAIN.fantom]: FantomImage,
  [CHAIN.optimism]: OptimismImage,
  [CHAIN.polygon]: PolygonImage
};

export const GROUP_CATEGORY_OPTIONS = [
  { label: 'Scam / Fishing', value: 'scam-fishing' },
  { label: 'Vulnerability', value: 'vulnerability' },
  { label: 'Exploit', value: 'exploit' },
  { label: 'Suspicious', value: 'suspicious' },
  { label: 'Unknown', value: 'unknown' }
];
