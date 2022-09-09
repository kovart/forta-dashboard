import { CHAIN } from '@constants/common';

const routes = {
  index: '/',
  combiner: '/combiner',
  watchlist: '/watchlist',
  findings: '/findings',
  uiKit: '/ui-kit',
  pageNotFound: '/404',
  external: {
    forta: {
      alert: (id) => `https://explorer.forta.network/alert/${id}`,
      bot: (id) => `https://explorer.forta.network/bot/${id}`
    },
    explorer: {
      [CHAIN.mainnet]: (addr) => `https://etherscan.io/address/${addr}`,
      [CHAIN.bsc]: (addr) => `https://bscscan.com/address/${addr}`,
      [CHAIN.polygon]: (addr) => `https://polygonscan.com/address/${addr}`,
      [CHAIN.fantom]: (addr) => `https://ftmscan.com/address/${addr}`,
      [CHAIN.optimism]: (addr) =>
        `https://optimistic.etherscan.io/address/${addr}`,
      [CHAIN.avalanche]: (addr) => `https://snowtrace.io/address/${addr}`,
      [CHAIN.arbitrium]: (addr) => `https://arbiscan.io/address/${addr}`
    },
    chainabuse: (addr) => `https://www.chainabuse.com/address/${addr}`,
    twitter: (addr) => `https://twitter.com/search?q=${addr}`
  }
};

export default routes;
