import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import explorer from '@utils/explorer';

const fetchQuery = ({ queryKey, pageParam }) => {
  const [
    ,
    limit,
    chainId,
    startDate,
    endDate,
    addresses,
    botIds,
    projectIds,
    severities
  ] = queryKey;

  return explorer.getData({
    limit,
    addresses,
    botIds,
    startDate,
    endDate,
    projectIds,
    severities,
    chainId,
    endCursor: pageParam
  });
};

function useExplorerQuery({ filter, limit = 20 }) {
  const {
    data,
    fetchNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage
  } = useInfiniteQuery(
    [
      'forta-alerts',
      limit,
      filter.chainId,
      filter.startDate,
      filter.endDate,
      filter.addresses,
      filter.botIds,
      filter.projectIds,
      filter.severities
    ],
    {
      queryFn: fetchQuery,
      getNextPageParam: (lastPage) =>
        lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
      keepPreviousData: true,
      retryDelay: 15,
      retry: 3
    }
  );

  const alerts = useMemo(() => {
    if (!data) {
      return [];
    }

    const items = [];

    data.pages.forEach((pageResponse) =>
      items.push(...explorer.prepareData(pageResponse))
    );

    return items;
  }, [data]);

  const totalAlerts = useMemo(
    () => data?.pages[data.pages.length - 1].pageInfo.totalAlerts,
    [data]
  );

  return {
    data,
    alerts,
    totalAlerts,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage
  };
}

export default useExplorerQuery;
