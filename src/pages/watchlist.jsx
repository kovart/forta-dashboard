import React, { useEffect, useMemo, useState } from 'react';

import BaseLayout from '@components/layouts/BaseLayout/BaseLayout';
import WatchListForm from '@components/partials/watchlist/Form/WatchListForm';
import WatchListContent from '@components/partials/watchlist/Content/WatchListContent';
import db from '@utils/db';
import logger from '@utils/logger';

function WatchListPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [groups, setGroups] = useState([]);
  const [filter, setFilter] = useState({
    search: ''
  });

  const filteredGroups = useMemo(() => {
    if (!filter.search.trim()) return groups;

    const search = filter.search.toLowerCase();
    return groups.filter(
      (g) =>
        g.title.toLowerCase().includes(search) ||
        g.description.toLowerCase().includes(search)
    );
  }, [groups, filter]);

  useEffect(() => {
    (async () => {
      try {
        const watchGroups = await db.watchGroups.toArray();
        setGroups(watchGroups);
      } catch (e) {
        logger.error(e);
      } finally {
        setIsInitialized(true);
      }
    })();
  }, []);

  return (
    <BaseLayout>
      <WatchListForm values={filter} onChange={setFilter} />
      <WatchListContent
        loading={!isInitialized}
        empty={groups.length === 0}
        groups={filteredGroups}
        onGroupsChange={setGroups}
      />
    </BaseLayout>
  );
}

export default WatchListPage;
