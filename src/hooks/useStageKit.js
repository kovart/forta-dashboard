import { useContext } from 'react';

import { AppContext } from '@components/providers/AppContext/AppContext';

function useStageKit(key) {
  const {
    data: {
      stageKits: { forta: fortaStageKits }
    }
  } = useContext(AppContext);

  return fortaStageKits.find((kit) => kit.key === key);
}

export default useStageKit;
