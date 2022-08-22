import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dayjs from 'dayjs';
import { UnmountClosed as CollapseContainer } from 'react-collapse';
import pluralize from 'pluralize';

import styles from './Alert.module.scss';

import Button from '@components/shared/Button/Button';
import Stage from '@components/shared/Stage/Stage';
import Address from '@components/shared/Address/Address';
import { IconSymbols } from '@components/shared/Icon/Icon';
import { AlertType, StageType } from '@constants/types';
import Chip from '@components/shared/Chip/Chip';
import { CSS_COLOR } from '@utils/css';

function Alert({
  alert,
  stage,
  lockedAddresses = [],
  checkedAddresses = [],
  checkedProjects = [],
  onCheckedAddressesChange,
  onCheckedProjectsChange,
  className
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = useMemo(() => {
    const now = dayjs();
    const date = dayjs(alert.createdAt);
    const days = now.diff(date, 'day');
    const hours = now.diff(date, 'hour') - days * 24;
    const minutes = now.diff(date, 'minute') - days * 24 * 60 - hours * 60;
    const seconds = Math.max(
      1,
      now.diff(date, 'second') -
        days * 24 * 60 * 60 -
        hours * 60 * 60 -
        minutes * 60
    );

    return (
      [
        [days, 'day'],
        [hours, 'hr'],
        [minutes, 'min'],
        [seconds, 'sec']
      ]
        .filter((v) => v[0] > 0)
        .slice(0, 2)
        .map((v) => v[0] + ' ' + pluralize(v[1], v[0]))
        .join(' ') + ' ago'
    );
  }, [alert]);

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

  function handleMoreClick(e) {
    e.stopPropagation();
    alert('Not implemented yet');
  }

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
          <Button
            variant="icon-md"
            icon={IconSymbols.MoreVertical}
            className={cn(styles.moreButton, {
              [styles.expanded]: isExpanded
            })}
            onClick={handleMoreClick}
          />
        </div>
      </div>
      <CollapseContainer
        isOpened={isExpanded}
        theme={{ collapse: styles.collapse, content: styles.body }}
      >
        {alert.metadata && (
          <div className={styles.metadata}>
            {JSON.stringify(alert.metadata, null, 4)}
          </div>
        )}
        {alert.addresses?.length > 0 && (
          <ul className={styles.addresses}>
            {alert.addresses.map((address) => {
              const isChecked = checkedAddresses.includes(address);
              return (
                <li key={address}>
                  <Address
                    chainId={alert.source.block.chainId}
                    checked={isChecked}
                    address={address}
                    disabled={lockedAddresses.includes(address)}
                    onCheckedChange={() =>
                      onCheckedAddressesChange(
                        isChecked
                          ? checkedAddresses.filter((a) => a !== address)
                          : [...checkedAddresses, address]
                      )
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
              const isChecked = checkedProjects.includes(project.id);
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
                      isChecked
                        ? onCheckedProjectsChange(
                            checkedProjects.filter((id) => id !== project.id)
                          )
                        : onCheckedProjectsChange([
                            ...checkedProjects,
                            project.id
                          ])
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
  className: PropTypes.string,
  lockedAddresses: PropTypes.arrayOf(PropTypes.string),
  checkedAddresses: PropTypes.arrayOf(PropTypes.string),
  checkedProjects: PropTypes.arrayOf(PropTypes.string),
  onCheckedAddressesChange: PropTypes.func,
  onCheckedProjectsChange: PropTypes.func
};

export default Alert;
