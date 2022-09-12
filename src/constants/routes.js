import { CHAIN } from '@constants/common';

const routes = {
  index: '/',
  combiner: '/combiner',
  watchlist: '/watchlist',
  uiKit: '/ui-kit',
  pageNotFound: '/404',
  external: {
    forta: {
      alert: (id) => `https://explorer.forta.network/alert/${id}`,
      bot: (id) => `https://explorer.forta.network/bot/${id}`
    },
    explorer: {
      [CHAIN.mainnet]: {
        address: (addr) => `https://etherscan.io/address/${addr}`,
        tx: (hash) => `https://etherscan.io/tx/${hash}`
      },
      [CHAIN.bsc]: {
        address: (addr) => `https://bscscan.com/address/${addr}`,
        tx: (hash) => `https://bscscan.com/tx/${hash}`
      },
      [CHAIN.polygon]: {
        address: (addr) => `https://polygonscan.com/address/${addr}`,
        tx: (hash) => `https://polygonscan.com/tx/${hash}`
      },
      [CHAIN.fantom]: {
        address: (addr) => `https://ftmscan.com/address/${addr}`,
        tx: (hash) => `https://ftmscan.com/tx/${hash}`
      },
      [CHAIN.optimism]: {
        address: (addr) => `https://optimistic.etherscan.io/address/${addr}`,
        tx: (hash) => `https://optimistic.etherscan.io/tx/${hash}`
      },
      [CHAIN.avalanche]: {
        address: (addr) => `https://snowtrace.io/address/${addr}`,
        tx: (hash) => `https://snowtrace.io/tx/${hash}`
      },
      [CHAIN.arbitrium]: {
        address: (addr) => `https://arbiscan.io/address/${addr}`,
        tx: (hash) => `https://arbiscan.io/tx/${hash}`
      }
    },
    chainabuse: (addr) => `https://www.chainabuse.com/address/${addr}`,
    twitter: (addr) => `https://twitter.com/search?q=${addr}`
  }
};

export default routes;
