import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './AlertGroup.module.scss';

import Alert from '@components/shared/Alert/Alert';
import Button from '@components/shared/Button/Button';
import Loader from '@components/shared/Loader/Loader';
import Icon, { IconSymbols } from '@components/shared/Icon/Icon';
import FilterForm from '@components/shared/FormModules/FilterForm/FilterForm';
import Fade from '@components/shared/Transitions/Fade/Fade';
import { AlertType, FilterLockType, FilterType } from '@constants/types';
import UfoImage from '@assets/images/ufo.svg';

function AlertGroup({
  title,
  badge,
  variant = 'red',
  alerts = [],
  actions = [],
  filter,
  locked = {},
  loading = false,
  loadingMore = false,
  shouldShowFilter = false,
  canLoadMore = false,
  onLoadMore,
  onFilterChange,
  className,
  ...props
}) {
  const { stagePreset } = filter;

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
                <Button
                  variant="icon-md"
                  icon={action.icon}
                  title={action.title}
                  onClick={action.onClick}
                />
              </li>
            ))}
          </ul>
        </div>
        {shouldShowFilter && (
          <FilterForm
            values={filter}
            locked={locked}
            onSubmit={onFilterChange}
          />
        )}
      </div>
      {alerts.length > 0 && (
        <div className={styles.infoPanel}>
          <Icon symbol={IconSymbols.Sort} size={24} />
          <span>Latest 25 from a total of 95 alerts</span>
        </div>
      )}
      <div className={styles.body}>
        {alerts.length > 0 && (
          <ul className={styles.alerts}>
            {alerts.map((alert, i) => {
              const stage = (stagePreset || []).find((stage) =>
                stage.alertIds.includes(alert.alertId)
              );

              return (
                <li key={alert.hash || i} className={styles.alert}>
                  <Alert
                    alert={alert}
                    stage={stage}
                    checkedAddresses={filter.addresses}
                    checkedProjects={filter.projects}
                    lockedAddresses={locked.addresses}
                    onCheckedProjectsChange={
                      onFilterChange &&
                      ((projects) => handleChange({ projects }))
                    }
                    onCheckedAddressesChange={
                      onFilterChange &&
                      ((addresses) => handleChange({ addresses }))
                    }
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
  variant: PropTypes.oneOf(['red']).isRequired,
  alerts: PropTypes.arrayOf(AlertType),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      onClick: PropTypes.func
    })
  ),
  locked: FilterLockType,
  shouldShowFilter: PropTypes.bool,
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool,
  canLoadMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
  onFilterChange: PropTypes.func,
  className: PropTypes.string
};

export default AlertGroup;
