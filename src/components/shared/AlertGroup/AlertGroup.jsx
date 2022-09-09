import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './AlertGroup.module.scss';

import Alert from '@components/shared/Alert/Alert';
import Button from '@components/shared/Button/Button';
import Loader from '@components/shared/Loader/Loader';
import Icon, { IconSymbols } from '@components/shared/Icon/Icon';
import FilterForm from '@components/shared/FormModules/FilterForm/FilterForm';
import Fade from '@components/shared/Transitions/Fade/Fade';
import {
  AlertType,
  FilterLockType,
  FilterPermanentElementsType,
  FilterType
} from '@constants/types';
import UfoImage from '@assets/images/ufo.svg';
import useStageKit from '@hooks/useStageKit';
import Tooltip from '@components/shared/Tooltip/Tooltip';

function AlertGroup({
  title,
  badge,
  variant = 'red',
  alerts = [],
  totalAlerts = { value: alerts.length },
  actions = [],
  filter = {},
  filterLocked = {},
  filterVisible = false,
  filterEditable = true,
  filterPermanentElements = {},
  loading = false,
  loadingMore = false,
  canLoadMore = false,
  infiniteScroll = true,
  onLoadMore,
  onFilterChange,
  className,
  ...props
}) {
  const stageKit = useStageKit(filter.stageKit);

  const [sentryRef] = useInfiniteScroll({
    loading: loading || loadingMore,
    hasNextPage: canLoadMore,
    onLoadMore: onLoadMore,
    disabled: !infiniteScroll
  });

  function handleChange(patchObj) {
    onFilterChange({ ...filter, ...patchObj });
  }

  return (
    <div className={cn(styles.root, className, styles[variant])} {...props}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h3 className={styles.title}>{title}</h3>
          {badge && (
            <div className={cn(styles.badge, styles[badge.variant])}>
              {badge.label}
            </div>
          )}
          <ul className={styles.actions}>
            {actions.map((action) => (
              <li key={action.title}>
                <Tooltip
                  title={action.title}
                  hideOnClick={action.titleHideOnClick}
                >
                  <Button
                    variant="icon-md"
                    icon={action.icon}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    loading={action.loading}
                  />
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
        {filterVisible && (
          <FilterForm
            values={filter}
            locked={filterLocked}
            editable={filterEditable}
            permanent={filterPermanentElements}
            onChange={onFilterChange}
            className={styles.filters}
          />
        )}
      </div>
      {alerts.length > 0 && (
        <div className={styles.infoPanel}>
          <Icon symbol={IconSymbols.Sort} size={24} />
          <span>
            Latest {alerts.length} from a total of{' '}
            {totalAlerts.relation === 'gte'
              ? `${totalAlerts.value}+`
              : totalAlerts.value}{' '}
            alerts
          </span>
        </div>
      )}
      <div className={styles.body}>
        {alerts.length > 0 && (
          <ul className={styles.alerts}>
            {alerts.map((alert, i) => {
              const stage = (stageKit?.stages || []).find((stage) =>
                stage.alertIds.includes(alert.alertId)
              );

              return (
                <li key={alert.hash || i} className={styles.alert}>
                  <Alert
                    alert={alert}
                    stage={stage}
                    filter={filter}
                    filterLocked={filterLocked}
                    onFilterChange={(patchObj) => handleChange(patchObj)}
                  />
                </li>
              );
            })}
          </ul>
        )}
        {alerts.length === 0 && !loading && (
          <div className={cn(styles.emptyState)}>
            <img
              src={UfoImage}
              height={150}
              alt="Empty state image"
              className={styles.image}
            />
            <div className={styles.title}>Oops, no results found</div>
          </div>
        )}
        {canLoadMore && (
          <div className={styles.footer}>
            <Button
              ref={sentryRef}
              variant="outline"
              onClick={onLoadMore}
              className={styles.loadMoreButton}
              loadingPosition="end"
              loading={loadingMore}
              disabled={loadingMore}
            >
              Load more
            </Button>
          </div>
        )}
        <Fade visible={loading}>
          <Loader
            position="absolute"
            spinner={alerts.length > 0 ? null : 'asterisk'}
            bg={alerts.length > 0 ? 'shimmer' : 'translucent'}
            spinnerSize="md"
          />
        </Fade>
      </div>
    </div>
  );
}

AlertGroup.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.shape({
    variant: PropTypes.oneOf(['yellow']).isRequired,
    label: PropTypes.string.isRequired
  }),
  filter: FilterType.isRequired,
  variant: PropTypes.oneOf(['red', 'blue']).isRequired,
  alerts: PropTypes.arrayOf(AlertType),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      loading: PropTypes.bool,
      disabled: PropTypes.bool,
      onClick: PropTypes.func
    })
  ),
  locked: FilterLockType,
  filterVisible: PropTypes.bool,
  filterLocked: FilterLockType,
  filterEditable: PropTypes.bool,
  filterPermanentElements: FilterPermanentElementsType,
  loading: PropTypes.bool,
  totalAlerts: PropTypes.shape({
    value: PropTypes.number,
    relation: PropTypes.string
  }),
  loadingMore: PropTypes.bool,
  infiniteScroll: PropTypes.bool,
  canLoadMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
  onFilterChange: PropTypes.func,
  className: PropTypes.string
};

export default AlertGroup;
