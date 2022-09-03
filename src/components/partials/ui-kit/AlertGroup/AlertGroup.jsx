import React, { useMemo, useState } from 'react';

import {
  mockAlert1,
  mockAlert2,
  mockAlert3,
  mockAlert4,
  mockAlert5,
  mockAlert6
} from './AlertGroup.mocks';

import UiKitSection from '@components/partials/ui-kit/Section/Section';
import AlertGroup from '@components/shared/AlertGroup/AlertGroup';
import Checkbox from '@components/shared/Form/Checkbox/Checkbox';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';
import { FortaDeFiKit } from '@constants/stages';
import { CHAIN } from '@constants/common';

const initialParameters = {
  chainId: CHAIN.avalanche,
  addresses: ['0x1041e66182c892d2ba9666f43c1c73c0ab8f5d09'],
  startDate: null,
  endDate: null,
  projects: [],
  severities: [],
  alertIds: {
    include: [],
    exclude: []
  },
  botIds: {
    include: [],
    exclude: []
  },
  stagePreset: FortaDeFiKit
};

function UiKitAlertGroup() {
  const [filter, setFilter] = useState(initialParameters);
  const [isLargeDataset, setIsLargeDataset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const alerts = useMemo(() => {
    if (isEmpty) {
      return [];
    } else {
      const items = [
        mockAlert1,
        mockAlert2,
        mockAlert3,
        mockAlert4,
        mockAlert5,
        mockAlert6
      ];
      if (isLargeDataset) {
        items.push(
          ...items.map((item, index) => ({ ...item, hash: '0x' + index }))
        );
      }
      return items;
    }
  }, [isEmpty, isLargeDataset]);

  return (
    <UiKitSection title="AlertGroup" direction="column">
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Checkbox
          name="dataset-checkbox"
          checked={isLargeDataset}
          onChange={(e) => setIsLargeDataset(e.target.checked)}
        >
          Large dataset
        </Checkbox>
        <Checkbox
          name="loading-checkbox"
          checked={isLoading}
          onChange={(e) => setIsLoading(e.target.checked)}
        >
          Loading
        </Checkbox>
        <Checkbox
          name="empty-checkbox"
          checked={isEmpty}
          onChange={(e) => setIsEmpty(e.target.checked)}
        >
          Empty
        </Checkbox>
        <Checkbox
          name="empty-checkbox"
          checked={canLoadMore}
          onChange={(e) => setCanLoadMore(e.target.checked)}
        >
          Can load more
        </Checkbox>
      </div>
      <AlertGroup
        shadow="red"
        title="Alerts"
        variant="red"
        loading={isLoading}
        badge={{ label: '2 STAGES', variant: 'yellow' }}
        alerts={alerts}
        shouldShowFilter={true}
        filter={filter}
        canLoadMore={!isEmpty && canLoadMore}
        actions={[
          {
            icon: IconSymbols.Refresh,
            title: 'Refresh'
          },
          {
            icon: IconSymbols.Save,
            title: 'Save'
          }
        ]}
        onFilterChange={setFilter}
      />
    </UiKitSection>
  );
}

export default UiKitAlertGroup;
