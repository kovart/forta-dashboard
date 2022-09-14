import { useContext, useMemo } from 'react';

import { AppContext } from '@components/providers/AppContext/AppContext';

function useStageKit(key) {
  const {
    data: {
      stageKits: { forta: fortaStageKits }
    }
  } = useContext(AppContext);

  return useMemo(() => fortaStageKits.find((kit) => kit.key === key), [key]);
}

export default useStageKit;
