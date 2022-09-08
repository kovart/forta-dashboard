import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import forta from '@utils/forta';

const fetchQuery = ({ queryKey, pageParam }) => {
  const [
    ,
    first,
    chainId,
    startDate,
    endDate,
    addresses,
    botIds,
    projectIds,
    severities
  ] = queryKey;

  return forta.getAlerts({
    first,
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

function useExplorerQuery({ filter, enabled, first = 20 }) {
  const {
    data,
    fetchNextPage,
    refetch,
    isFetched,
    isFetching,
    isFetchingNextPage,
    hasNextPage
  } = useInfiniteQuery(
    [
      'forta-alerts',
      first,
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
      retry: 3,
      enabled: enabled
    }
  );

  const alerts = useMemo(() => {
    if (!data) {
      return [];
    }

    const items = [];

    data.pages.forEach((pageResponse) =>
      items.push(...forta.prepareAlertsResponse(pageResponse))
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
    isFetched,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage
  };
}

export default useExplorerQuery;
