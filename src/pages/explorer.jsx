import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import BaseLayout from '@components/layouts/BaseLayout/BaseLayout';
import AlertGroup from '@components/shared/AlertGroup/AlertGroup';
import { CHAIN, SYSTEM_DATE_FORMAT } from '@constants/common';
import { IconSymbols } from '@components/shared/Icon/Icon';
import useExplorerQuery from '@hooks/useExplorerQuery';
import { scrollToElement } from '@utils/helpers';

function ExplorerPage() {
  const [filter, setFilter] = useState(() => ({
    chainId: CHAIN.mainnet,
    addresses: [],
    startDate: dayjs().subtract(7, 'day').format(SYSTEM_DATE_FORMAT),
    endDate: null,
    severities: [],
    projectIds: [],
    alertIds: {
      include: [],
      exclude: []
    },
    botIds: {
      include: [],
      exclude: []
    },
    stagePreset: null
  }));

  const {
    alerts,
    totalAlerts,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useExplorerQuery({
    filter
  });

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
        totalAlerts={
          totalAlerts?.relation === 'gte'
            ? totalAlerts.value + '+'
            : totalAlerts?.value
        }
        filter={filter}
        filterVisible={true}
        filterLocked={{ addresses: [] }}
        filterEditable={true}
        filterPermanentElements={{
          chain: true,
          period: true,
          stagePreset: filter.addresses.length > 0
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
