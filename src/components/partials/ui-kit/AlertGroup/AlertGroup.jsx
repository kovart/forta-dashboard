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
import { STAGE_COLOR } from '@constants/stages';

function UiKitAlertGroup() {
  const [isLargeDataset, setIsLargeDataset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const [filter] = useState({
    stagePreset: [
      {
        color: STAGE_COLOR.blue,
        label: 'Stage 1',
        alertIds: [mockAlert2.alertId]
      },
      {
        color: STAGE_COLOR.orange,
        label: 'Stage 2',
        alertIds: [mockAlert5.alertId]
      }
    ]
  });

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
          },
          {
            icon: IconSymbols.Cross,
            title: 'Remove'
          },
          {
            icon: IconSymbols.MoreVertical,
            title: 'More'
          }
        ]}
      />
    </UiKitSection>
  );
}

export default UiKitAlertGroup;
