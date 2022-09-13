import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import useUrlState from '@ahooksjs/use-url-state';

import BaseLayout from '@components/layouts/BaseLayout/BaseLayout';
import AlertGroup from '@components/shared/AlertGroup/AlertGroup';
import SaveToWatchListModal from '@components/modals/SaveToWatchListModal/SaveToWatchListModal';
import useExplorerQuery from '@hooks/useExplorerQuery';
import { CHAIN, SYSTEM_DATE_FORMAT } from '@constants/common';
import { IconSymbols } from '@components/shared/Icon/Icon';
import { copyToClipboard, scrollToElement, getFullUrl } from '@utils/helpers';
import routes from '@constants/routes';

function ExplorerPage() {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
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

  useEffect(() => {
    scrollToElement('alerts');
  }, [isReloading]);

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
        title: 'Copy link',
        icon: IconSymbols.Link,
        onClick: () => {
          copyToClipboard(getFullUrl(routes.index, filter));
        }
      },
      {
        title: 'Save',
        icon: IconSymbols.Save,
        onClick: () => setIsSaveModalOpen(true)
      }
    ],
    [isFetching]
  );

  return (
    <BaseLayout>
      <AlertGroup
        id="alerts"
        variant="blue"
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
      <SaveToWatchListModal
        open={isSaveModalOpen}
        filter={filter}
        totalAlerts={totalAlerts}
        onClose={() => setIsSaveModalOpen(false)}
      />
    </BaseLayout>
  );
}

export default ExplorerPage;
