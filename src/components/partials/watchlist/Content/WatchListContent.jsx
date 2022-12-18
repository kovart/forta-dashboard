import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import styles from './WatchListContent.module.scss';

import Spinner from '@components/shared/Spinner/Spinner';
import AlertGroupCard from '@components/shared/AlertGroupCard/AlertGroupCard';
import logger from '@utils/logger';
import db from '@utils/db';
import { stringifyQuery } from '@utils/helpers';
import { WatchGroupType } from '@constants/types';
import routes from '@constants/routes';

function WatchListContent({ empty, loading, groups = [], onGroupsChange }) {
  const navigate = useNavigate();
  const [isDeletingByGroupId, setIsDeletingByGroupId] = useState({});

  async function handleDelete(group) {
    try {
      setIsDeletingByGroupId((v) => ({ ...v, [group.id]: true }));
      await db.watchClusters.delete(group.id);
      onGroupsChange(groups.filter((g) => g.id !== group.id));
    } catch (e) {
      logger.error(e);
    } finally {
      setIsDeletingByGroupId((v) => ({ ...v, [group.id]: false }));
    }
  }

  function handleNavigate(group) {
    navigate({
      pathname: routes.index,
      search: stringifyQuery(group.filter)
    });
  }

  if (loading) {
    return (
      <div className={styles.loader}>
        <Spinner size="sm" className={styles.spinner} /> Loading database...
      </div>
    );
  }

  if (!loading && empty) {
    return (
      <p className={styles.notification}>
        Unfortunately, you don&apos;t have any saved groups yet.
      </p>
    );
  }

  if (groups.length === 0) {
    return (
      <p className={styles.notification}>
        Cannot find items that match the search query
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {groups.map((group) => (
        <li key={group.id} className={styles.item}>
          <AlertGroupCard
            group={group}
            deleting={isDeletingByGroupId[group.id]}
            onDelete={() => handleDelete(group)}
            onNavigate={() => handleNavigate(group)}
            className={styles.card}
          />
        </li>
      ))}
    </ul>
  );
}

WatchListContent.propTypes = {
  empty: PropTypes.bool,
  loading: PropTypes.bool,
  groups: PropTypes.arrayOf(WatchGroupType),
  onGroupsChange: PropTypes.func
};

export default WatchListContent;
