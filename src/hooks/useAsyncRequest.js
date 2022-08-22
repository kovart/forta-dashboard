import { useEffect, useState } from 'react';

import Logger from '@utils/logger';

function useAsyncRequest(params) {
  const { fetchFn, deps = [], keepPreviousData = true } = params;

  const [state, setState] = useState({
    isFetched: false,
    isFetching: false,
    data: null,
    error: null
  });

  async function fetch() {
    try {
      setState((v) => ({
        isFetched: false,
        isFetching: true,
        data: keepPreviousData ? v.data : null,
        error: null
      }));
      const data = await fetchFn();
      setState({
        isFetched: true,
        data: data,
        error: null
      });
    } catch (e) {
      Logger.error(e);
      setState((v) => ({ ...v, error: e }));
    } finally {
      setState((v) => ({ ...v, isFetching: false }));
    }
  }

  useEffect(() => {
    fetch();
  }, deps);

  return {
    isFetching: state.isFetching,
    isFetched: state.isFetched,
    data: state.data,
    error: state.error,
    refetch: fetch
  };
}

export default useAsyncRequest;
