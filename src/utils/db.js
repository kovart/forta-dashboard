import Dexie from 'dexie';

import { DB_NAME, DB_VERSION } from '@constants/common';

const db = new Dexie(DB_NAME);

db.version(DB_VERSION).stores({
  combinerAnalyses: '++id, chainId, startDate, endDate, stageKit',
  combinerClusters: '++id, analysisId',
  watchClusters: '++id'
});

export default db;
