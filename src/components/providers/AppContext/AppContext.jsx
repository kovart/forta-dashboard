import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import LRU from 'lru-cache';

import { CHAIN_RPC_URLS } from '@constants/common';
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
  const counterRef = useRef(0);

  const providersCache = useMemo(
    () =>
      new LRU({
        max: 20,
        ttl: 1000 * 60 * 30 /* 30min */,
        updateAgeOnGet: true,
        fetchMethod: (chainId) =>
          CHAIN_RPC_URLS[chainId].map(
            (url) => new ethers.providers.JsonRpcProvider(url)
          )
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
          const providers = await providersCache.fetch(chainId);
          const provider = providers[counterRef.current++ % providers.length];

          let transactionCount, isContract;
          isContract = await retry(
            async () => (await provider.getCode(address)) !== '0x'
          );
          if (!isContract) {
            transactionCount = await retry(() =>
              provider.getTransactionCount(address)
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
      getProvider: (chainId) => {
        const providers = providersCache.fetch(chainId);
        return providers[counterRef.current++ % providers.length];
      },
      getAddressMeta: (address, chainId, context = {}) =>
        addressesCache.fetch(address + '.' + chainId, {
          fetchContext: context
        }),
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
