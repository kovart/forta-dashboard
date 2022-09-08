import Dexie from 'dexie';

import { DB_NAME, DB_VERSION } from '@constants/common';

const db = new Dexie(DB_NAME);

db.version(DB_VERSION).stores({
  groups: '++id, analysisId',
  analyses: '++id, chainId, startDate, endDate, stageKit'
});

export default db;
