import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dayjs from 'dayjs';
import { UnmountClosed as CollapseContainer } from 'react-collapse';

import styles from './Alert.module.scss';

import Button from '@components/shared/Button/Button';
import Stage from '@components/shared/Stage/Stage';
import Address from '@components/shared/Address/Address';
import Menu from '@components/shared/Menu/Menu';
import Chip from '@components/shared/Chip/Chip';
import Tooltip from '@components/shared/Tooltip/Tooltip';
import { IconSymbols } from '@components/shared/Icon/Icon';
import {
  AlertType,
  FilterLockType,
  FilterType,
  StageType
} from '@constants/types';
import { CSS_COLOR } from '@utils/css';
import { POPOVER_PLACEMENT } from '@components/shared/Popover/Popover.utils';
import routes from '@constants/routes';

function Alert({
  alert,
  stage,
  filter,
  filterLocked = {},
  onFilterChange,
  className
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = useMemo(
    () =>
      // TODO add year if more than 1 years ago
      dayjs(alert.createdAt).format('DD MMM HH:mm:ss'),
    [alert]
  );

  // Forta Explorer often responds with duplicated projects
  const projects = useMemo(() => {
    const ids = [];

    return (alert.projects || []).filter((p) => {
      if (ids.includes(p.id)) return false;
      else {
        ids.push(p.id);
        return true;
      }
    });
  }, []);

  return (
    <div className={cn(styles.root, className)}>
      <div
        tabIndex={0}
        className={cn(styles.header, { [styles.expanded]: isExpanded })}
        onClick={() => setIsExpanded((v) => !v)}
      >
        <div
          className={cn(styles.severity, styles[alert.severity.toLowerCase()])}
        />
        <div className={styles.name}>{alert.name}</div>
        <div className={styles.description} title={alert.description}>
          {alert.description}
        </div>
        <div className={styles.meta}>
          {stage && <Stage stage={stage} className={styles.stage} />}
          <div className={styles.date} title={alert.createdAt}>
            {formattedDate}
          </div>
          <Menu
            preferredWidth={200}
            placement={POPOVER_PLACEMENT.bottomEnd}
            renderElement={({ ref, toggle }) => (
              <Tooltip title="View options">
                <Button
                  ref={ref}
                  variant="icon-md"
                  icon={IconSymbols.MoreVertical}
                  className={cn(styles.moreButton, {
                    [styles.expanded]: isExpanded
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle();
                  }}
                />
              </Tooltip>
            )}
          >
            <Menu.Item
              startIcon={IconSymbols.CPU}
              href={routes.external.forta.bot(alert.source.bot.id)}
            >
              View bot page
            </Menu.Item>
            <Menu.Item
              startIcon={IconSymbols.AlertCircle}
              href={routes.external.forta.alert(alert.hash)}
            >
              View alert details
            </Menu.Item>
            <Menu.Item
              startIcon={IconSymbols.Clipboard}
              href={routes.external.explorer[alert.source.block.chainId]?.tx(
                alert.source.transactionHash
              )}
            >
              View tx details
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item
              startIcon={IconSymbols.EyeOff}
              onClick={() => {
                //   TODO Implement when backend is ready
                window.alert('Not implemented yet');
              }}
            >
              Mute this bot
            </Menu.Item>
            <Menu.Item
              startIcon={IconSymbols.Filter}
              onClick={() => {
                onFilterChange({ ...filter, botIds: [alert.source.bot.id] });
              }}
            >
              Filter by this bot
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <CollapseContainer
        isOpened={isExpanded}
        theme={{ collapse: styles.collapse, content: styles.body }}
      >
        {alert.metadata && (
          <div className={styles.metadata}>
            {JSON.stringify(alert.metadata, null, 4).replace(/\\"/g, '"')}
          </div>
        )}
        {alert.addresses.size > 0 && (
          <ul className={styles.addresses}>
            {[...alert.addresses].map((address) => {
              const addresses = filter.addresses || [];
              const isChecked = addresses.includes(address);
              const isLocked = (filterLocked.addresses || []).includes(address);
              return (
                <li key={address}>
                  <Address
                    chainId={alert.source.block.chainId}
                    address={address}
                    checked={isChecked}
                    disabled={isLocked}
                    onCheckedChange={() =>
                      onFilterChange({
                        addresses: isChecked
                          ? addresses.filter((a) => a !== address)
                          : [...addresses, address]
                      })
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
        {projects.length > 0 && (
          <ul className={styles.projects}>
            {projects.map((project) => {
              const projectIds = filter.projectIds || [];
              const isChecked = projectIds.includes(project.id);
              return (
                <li key={project.id}>
                  <Chip
                    checked={isChecked}
                    icon={{
                      symbol: IconSymbols.Box,
                      color: CSS_COLOR.accentBlue2
                    }}
                    variant="outline"
                    onClick={() =>
                      onFilterChange({
                        projectIds: isChecked
                          ? projectIds.filter((id) => id !== project.id)
                          : [...projectIds, project.id]
                      })
                    }
                  >
                    {project.name}
                  </Chip>
                </li>
              );
            })}
          </ul>
        )}
      </CollapseContainer>
    </div>
  );
}

Alert.propTypes = {
  alert: AlertType.isRequired,
  stage: StageType,
  filter: FilterType.isRequired,
  filterLocked: FilterLockType,
  className: PropTypes.string,
  onFilterChange: PropTypes.func
};

export default Alert;
