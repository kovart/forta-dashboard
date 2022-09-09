import React, { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import useUrlState from '@ahooksjs/use-url-state';

import BaseLayout from '@components/layouts/BaseLayout/BaseLayout';
import AlertGroup from '@components/shared/AlertGroup/AlertGroup';
import useExplorerQuery from '@hooks/useExplorerQuery';
import { CHAIN, SYSTEM_DATE_FORMAT } from '@constants/common';
import { IconSymbols } from '@components/shared/Icon/Icon';
import { scrollToElement } from '@utils/helpers';

function ExplorerPage() {
  const [filter, setFilter] = useUrlState(
    () => ({
      chainId: CHAIN.mainnet,
      addresses: [],
      botIds: [],
      severities: [],
      startDate: dayjs().subtract(7, 'day').format(SYSTEM_DATE_FORMAT),
      endDate: null,
      stageKit: null
    }),
    {
      stringifyOptions: { arrayFormat: 'bracket' },
      parseOptions: { arrayFormat: 'bracket' }
    }
  );

  const {
    alerts,
    totalAlerts,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useExplorerQuery({ filter });

  const isReloading = isFetching && !isFetchingNextPage;

  const actions = useMemo(
    () => [
      {
        title: 'Refresh',
        icon: IconSymbols.Refresh,
        loading: isFetching,
        disabled: isFetching,
        onClick: refetch
      },
      {
        title: 'Share',
        icon: IconSymbols.Share2,
        onClick: () => alert('Not implemented yet')
      },
      {
        title: 'Save',
        icon: IconSymbols.Save,
        onClick: () => alert('Not implemented yet')
      }
    ],
    [isFetching]
  );

  useEffect(() => {
    scrollToElement('alerts');
  }, [isReloading]);

  return (
    <BaseLayout>
      <AlertGroup
        id="alerts"
        variant="red"
        title="Alerts"
        alerts={alerts}
        totalAlerts={totalAlerts}
        filter={filter}
        filterVisible={true}
        filterLocked={{ addresses: [] }}
        filterEditable={true}
        filterPermanentElements={{
          chain: true,
          period: true,
          stageKit: filter.addresses.length > 0
        }}
        loading={isReloading}
        loadingMore={isFetchingNextPage}
        actions={actions}
        onFilterChange={setFilter}
        canLoadMore={hasNextPage}
        onLoadMore={fetchNextPage}
      />
    </BaseLayout>
  );
}

export default ExplorerPage;
