import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { createInterpolator } from 'range-interpolator';
import { queue } from 'async';
import { ethers } from 'ethers';
import dayjs from 'dayjs';

import BaseLayout from '@components/layouts/BaseLayout/BaseLayout';
import AnalyzeForm from '@components/partials/combiner/AnalyzeForm/AnalyzeForm';
import GroupPanel from '@components/partials/combiner/GroupPanel/GroupPanel';
import Progress from '@components/shared/Progress/Progress';
import AlertGroup from '@components/shared/AlertGroup/AlertGroup';
import useExplorerQuery from '@hooks/useExplorerQuery';
import logger from '@utils/logger';
import forta, { FortaExplorer } from '@utils/forta';
import { AppContext } from '@components/providers/AppContext/AppContext';
import db from '@utils/db';
import { delay } from '@utils/helpers';
import { CHAIN, SYSTEM_DATE_FORMAT } from '@constants/common';
import { FortaGeneralKit } from '@constants/stages';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';

const TRANSACTION_THRESHOLD = 75;

function CombinerPage() {
  const {
    data: {
      stageKits: { forta: fortaStageKits }
    },
    getAddressMeta
  } = useContext(AppContext);

  const [analyseForm, setAnalyseForm] = useState(() => ({
    chainId: CHAIN.mainnet,
    startDate: dayjs().subtract(1, 'day').format(SYSTEM_DATE_FORMAT),
    endDate: null,
    stageKit: FortaGeneralKit.key
  }));

  const [analysis, setAnalysis] = useState(null);
  const [groups, setGroups] = useState([]); // array
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupFilter, setGroupFilter] = useState({}); // alerts filter
  const [progress, setProgress] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const group = useMemo(() => groups[groupIndex] || null, [groups, groupIndex]);

  const {
    alerts,
    totalAlerts,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useExplorerQuery({ filter: groupFilter, enabled: !!group });

  useLayoutEffect(() => {
    (async () => {
      setIsAnalysing(true);
      const analyses = await db.analyses.toArray();
      const lastAnalysis = analyses[analyses.length - 1];
      if (lastAnalysis) {
        setProgress({
          text: 'Restoring previous analysis',
          percent: 60
        });
        const groups = await db.groups
          .where({ analysisId: lastAnalysis.id })
          .toArray();
        setAnalysis(lastAnalysis);
        setGroups(groups);
        setAnalyseForm({
          chainId: lastAnalysis.chainId,
          startDate: lastAnalysis.startDate,
          endDate: lastAnalysis.endDate,
          stageKit: lastAnalysis.stageKit
        });
        setProgress({
          text: 'The previous analysis has been restored',
          percent: 100
        });
        await delay(1500);
      }
      setIsAnalysing(false);
    })();
  }, []);

  useEffect(() => {
    if (group) {
      setGroupFilter({
        addresses: [group.address],
        chainId: analysis.chainId,
        startDate: analysis.startDate,
        endDate: analysis.endDate,
        stageKit: analysis.stageKit
      });
    }
  }, [group]);

  async function handleFormSubmit(values) {
    setAnalyseForm(values);
    await analyze(values);
  }

  async function analyze(values) {
    try {
      setIsAnalysing(true);
      setProgress({
        text: 'Fetching alerts...',
        percent: 5
      });

      const { chainId, startDate, endDate } = values;
      const stageKit = fortaStageKits.find(
        (kit) => kit.key === values.stageKit
      );

      const alerts = await forta.getAllAlerts({
        chainId,
        startDate,
        endDate,
        alertIds: stageKit.stages.map((s) => s.alertIds).flat(),
        botIds: stageKit.botIds,
        query: FortaExplorer.shortAlertQuery,
        onPageLoaded: (_, alerts) =>
          setProgress({
            text: `Fetching alerts: ${alerts.size}`,
            percent: createInterpolator({
              inputRange: [0, 1e6],
              outputRange: [5, 35],
              extrapolate: 'clamp'
            })(alerts.size)
          })
      });

      setProgress((v) => ({ ...v, text: 'Collecting unique addresses...' }));

      let alertCounter = 0;
      let addresses = new Set();
      for (const alert of alerts) {
        for (const address of alert.addresses) {
          addresses.add(address);
        }
        alertCounter++;
        if (alertCounter % 100 === 0) {
          setProgress({
            text: `Collecting unique addresses in the alerts: ${alertCounter}/${alerts.size}`,
            percent: 40
          });
          await delay(1);
        }
      }
      // remove zero address
      addresses.delete(ethers.constants.AddressZero);
      logger.info('collected unique addresses', addresses.size);

      setProgress((v) => ({ ...v, text: 'Grouping alerts...' }));

      // micro optimization
      const stageLabelsByAlertId = new Map();
      stageKit.stages.forEach((stage) => {
        stage.alertIds.forEach((id) =>
          stageLabelsByAlertId.set(id, stage.label)
        );
      });

      let addressCounter = 0;
      let groups = new Set();
      for (const address of addresses) {
        addressCounter++;
        if (addressCounter % 100 === 0) {
          setProgress({
            text: `Grouping alerts: ${addressCounter}/${addresses.size}`,
            percent: createInterpolator({
              inputRange: [0, addresses.size],
              outputRange: [40, 75],
              extrapolate: 'clamp'
            })(addressCounter)
          });
          await delay(1);
        }

        const addressStages = new Set();
        for (const alert of alerts) {
          if (!alert.addresses.has(address)) continue;

          const stageLabel = stageLabelsByAlertId.get(alert.alertId);
          if (stageLabel) addressStages.add(stageLabel);
        }

        if (addressStages.size >= 2) {
          groups.add({
            address,
            chainId,
            startDate,
            endDate,
            stages: [...addressStages]
          });
        }
      }

      logger.info('grouped alerts', groups.size);

      if (groups.size === 0) {
        setProgress({
          text: `No alerts were clustered`,
          percent: 100
        });
        setIsAnalysing(false);
        return;
      }

      setProgress((v) => ({ ...v, text: 'Filtering groups...' }));

      const parallelRequests = 40;
      const totalGroups = groups.size;

      let groupsQueueCounter = 0;
      const groupsQueue = queue(async (group, callback) => {
        setProgress({
          text: `Filtering addresses: ${++groupsQueueCounter}/${totalGroups}`,
          percent: createInterpolator({
            inputRange: [0, totalGroups],
            outputRange: [75, 95],
            extrapolate: 'clamp'
          })(groupsQueueCounter)
        });
        const meta = await getAddressMeta(group.address, chainId);
        if (meta.isContract || meta.transactionCount > TRANSACTION_THRESHOLD) {
          groups.delete(group);
        }
        callback();
      }, parallelRequests);

      // memory optimization
      let groupsLoopCounter = 0;
      for (const group of groups) {
        groupsLoopCounter++;
        groupsQueue.push(group);
        if (groupsLoopCounter % parallelRequests === 0) {
          await groupsQueue.unsaturated();
        }
      }
      await groupsQueue.drain();

      logger.info('removed groups', totalGroups - groups.size);
      logger.info('filtered addresses', groups.size);

      setProgress({
        text: `Sorting groups...`,
        percent: 98
      });
      await delay(1);

      // transform Set to Array
      groups = [...groups];
      groups.sort(
        (group1, group2) => group2.stages.length - group1.stages.length
      );

      setProgress({
        text: 'Done',
        percent: 100
      });

      await db.transaction('rw', [db.analyses, db.groups], async () => {
        await db.analyses.clear();
        await db.groups.clear();

        const analysisId = await db.analyses.add({
          chainId,
          startDate,
          endDate,
          stageKit: stageKit.key
        });
        db.groups.bulkAdd(groups.map((g) => ({ ...g, analysisId })));
      });

      setGroups(groups);
    } catch (e) {
      logger.error(e);
      setProgress({
        text: 'Error: ' + e.message,
        percent: 0
      });
    } finally {
      setIsAnalysing(false);
    }
  }

  const actions = useMemo(
    () => [
      {
        title: 'Refresh',
        icon: IconSymbols.Refresh,
        loading: isFetching,
        disabled: isFetching,
        onClick: refetch
      },
      {
        title: 'Share',
        icon: IconSymbols.Share2,
        onClick: () => alert('Not implemented yet')
      },
      {
        title: 'Save',
        icon: IconSymbols.Save,
        onClick: () => alert('Not implemented yet')
      }
    ],
    [isFetching]
  );

  return (
    <BaseLayout>
      <AnalyzeForm
        values={analyseForm}
        submitting={isAnalysing}
        onChange={setAnalyseForm}
        onSubmit={handleFormSubmit}
      />
      {(!group || isAnalysing) && (
        <Progress
          maxWidth={600}
          value={
            progress || {
              text: 'As soon as you start the analysis, the progress will be displayed here.',
              percent: 0
            }
          }
        />
      )}
      {group && !isAnalysing && (
        <>
          <GroupPanel
            group={group}
            groupIndex={groupIndex}
            totalGroups={groups.length}
            stageKit={analysis.stageKit}
            onGroupIndexChange={setGroupIndex}
          />
          <AlertGroup
            title="Alerts"
            variant="red"
            alerts={alerts}
            totalAlerts={totalAlerts}
            loading={isFetching && !isFetchingNextPage}
            loadingMore={isFetchingNextPage}
            canLoadMore={hasNextPage}
            filter={groupFilter}
            filterEditable={true}
            filterVisible={true}
            actions={actions}
            onLoadMore={fetchNextPage}
            onFilterChange={setGroupFilter}
          />
        </>
      )}
    </BaseLayout>
  );
}

export default CombinerPage;
