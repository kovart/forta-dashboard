import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import LRU from 'lru-cache';

import { CHAIN_RPC_URL } from '@constants/common';
import {
  ExperimentalGeneralKit,
  FortaGeneralKit,
  FortaScamKit
} from '@constants/stages';
import { retry } from '@utils/helpers';

export const AppContext = React.createContext({
  getProvider: () => null,
  getAddressMeta: () => null,
  data: {}
});

function AppContextProvider({ children }) {
  const providersCache = useMemo(
    () =>
      new LRU({
        max: 20,
        ttl: 1000 * 60 * 30 /* 30min */,
        updateAgeOnGet: true,
        fetchMethod: (chainId) =>
          new ethers.providers.JsonRpcProvider(CHAIN_RPC_URL[chainId])
      }),
    []
  );

  const addressesCache = useMemo(
    () =>
      new LRU({
        max: 1000,
        ttl: 1000 * 60 * 15 /* 15min */,
        updateAgeOnGet: true,
        fetchMethod: async (key) => {
          const [address, chainId] = key.split('.');
          let transactionCount, isContract;
          const provider = await providersCache.fetch(chainId);
          isContract = await retry(
            async () => (await provider.getCode(address)) !== '0x',
            { wait: 500 }
          );
          if (!isContract) {
            transactionCount = await retry(
              () => provider.getTransactionCount(address),
              { wait: 500 }
            );
          }

          return {
            isContract,
            transactionCount: transactionCount || 0
          };
        }
      }),
    []
  );

  const context = useMemo(
    () => ({
      getProvider: (chainId) => providersCache.fetch(chainId),
      getAddressMeta: (address, chainId) =>
        addressesCache.fetch(address + '.' + chainId),
      data: {
        stageKits: {
          forta: [FortaGeneralKit, ExperimentalGeneralKit, FortaScamKit],
          // not implemented yet
          user: []
        }
      }
    }),
    []
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.any
};

export default AppContextProvider;
