import Dexie from 'dexie';

import { DB_NAME, DB_VERSION } from '@constants/common';

const db = new Dexie(DB_NAME);

db.version(DB_VERSION).stores({
  combinerAnalyses: '++id, chainId, startDate, endDate, stageKit',
  combinerGroups: '++id, analysisId',
  watchGroups: '++id'
});

export default db;
