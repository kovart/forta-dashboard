import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './AlertGroupCard.module.scss';

import Button from '@components/shared/Button/Button';
import ChainChip from '@components/shared/FormModules/FilterForm/Chain/ChainChip';
import PeriodChip from '@components/shared/FormModules/FilterForm/Period/PeriodChip';
import Tooltip from '@components/shared/Tooltip/Tooltip';
import Address from '@components/shared/Address/Address';
import { IconSymbols } from '@components/shared/Icon/Icon';
import { WatchGroupType } from '@constants/types';
import { GROUP_CATEGORY_OPTIONS } from '@constants/common';
import logger from '@utils/logger';
import forta from '@utils/forta';

function AlertGroupCard({ group, deleting, className, onNavigate, onDelete }) {
  const [newTotalAlerts, setNewTotalValue] = useState(null);
  const newCounter = useMemo(() => {
    if (!newTotalAlerts) return 0;

    return newTotalAlerts.value - group.totalAlerts.value;
  }, [group, newTotalAlerts]);
  const categoryLabel = useMemo(
    () => GROUP_CATEGORY_OPTIONS.find((o) => o.value === group.category)?.label,
    [group]
  );

  useEffect(() => {
    (async () => {
      try {
        const { pageInfo } = await forta.getAlerts({
          ...group.filter,
          first: 1
        });
        setNewTotalValue(pageInfo.totalAlerts);
      } catch (e) {
        logger.error(e);
      }
    })();
  }, [group]);

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.category}>{categoryLabel}</div>
      <h2 className={styles.title}>{group.title}</h2>
      <p className={styles.description}>{group.description}</p>
      <div className={styles.stats}>
        <div className={styles.alerts}>
          <span className={styles.value}>
            {group.totalAlerts.value}
            {group.totalAlerts.relation === 'gte' ? '+' : ''}
          </span>
          alerts
          {newCounter !== 0 && (
            <span className={styles.badge}>
              {(newCounter <= 0 ? '' : '+') + newCounter}
            </span>
          )}
        </div>
      </div>
      <div className={styles.filter}>
        <div className={styles.chips}>
          <ChainChip value={group.filter.chainId} />
          {(group.filter.startDate || group.filter.endDate) && (
            <PeriodChip
              value={[group.filter.startDate, group.filter.endDate]}
            />
          )}
        </div>
        {group.filter.addresses.length > 0 && (
          <div className={styles.addresses}>
            {group.filter.addresses.map((address) => (
              <Address
                key={address}
                address={address}
                chainId={group.filter.chainId}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <Tooltip title="Delete">
          <Button
            variant="icon-md"
            loading={deleting}
            disabled={deleting}
            onClick={onDelete}
            icon={IconSymbols.Cross}
          />
        </Tooltip>
        <Tooltip title="Go to Explorer">
          <Button
            variant="icon-md"
            onClick={onNavigate}
            icon={IconSymbols.ArrowRight}
          />
        </Tooltip>
      </div>
    </div>
  );
}

AlertGroupCard.propTypes = {
  deleting: PropTypes.bool,
  group: WatchGroupType.isRequired,
  className: PropTypes.string,
  onDelete: PropTypes.func,
  onNavigate: PropTypes.func
};

export default AlertGroupCard;
