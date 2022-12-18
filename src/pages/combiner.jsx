import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { createInterpolator } from 'range-interpolator';
import { queue } from 'async';
import dayjs from 'dayjs';

import BaseLayout from '@components/layouts/BaseLayout/BaseLayout';
import AnalyzeForm from '@components/partials/combiner/AnalyzeForm/AnalyzeForm';
import ClusterPanel from '@components/partials/combiner/ClusterPanel/ClusterPanel';
import Progress from '@components/shared/Progress/Progress';
import AlertGroup from '@components/shared/AlertGroup/AlertGroup';
import SaveToWatchListModal from '@components/modals/SaveToWatchListModal/SaveToWatchListModal';
import { AppContext } from '@components/providers/AppContext/AppContext';
import db from '@utils/db';
import {
  copyToClipboard,
  delay,
  getFullUrl,
  scrollToElement
} from '@utils/helpers';
import useExplorerQuery from '@hooks/useExplorerQuery';
import logger from '@utils/logger';
import forta, { FortaExplorer } from '@utils/forta';
import {
  CHAIN,
  ENTITY_CLUSTER_BOT_ID,
  SYSTEM_DATE_FORMAT
} from '@constants/common';
import { FortaGeneralKit } from '@constants/stages';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';
import { BURN_ADDRESSES } from '@constants/addresses';
import routes from '@constants/routes';

const TRANSACTION_THRESHOLD = 250;

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
  const [clusters, setClusters] = useState([]); // array
  const [clusterIndex, setClusterIndex] = useState(0);
  const [clusterFilter, setClusterFilter] = useState({}); // alerts filter
  const [progress, setProgress] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const cluster = useMemo(
    () => clusters[clusterIndex] || null,
    [clusters, clusterIndex]
  );

  const {
    alerts,
    totalAlerts,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useExplorerQuery({ filter: clusterFilter, enabled: !!cluster });

  const isReloading = isFetching && !isFetchingNextPage;

  useLayoutEffect(() => {
    (async () => {
      setIsAnalysing(true);
      const analyses = await db.combinerAnalyses.toArray();
      const lastAnalysis = analyses[analyses.length - 1];
      if (lastAnalysis) {
        setProgress({
          text: 'Restoring previous analysis',
          percent: 60
        });
        const groups = await db.combinerClusters
          .where({ analysisId: lastAnalysis.id })
          .toArray();
        setAnalysis(lastAnalysis);
        setClusters(groups);
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
    if (cluster) {
      setClusterFilter({
        addresses: cluster.addresses,
        chainId: analysis.chainId,
        startDate: analysis.startDate,
        endDate: analysis.endDate,
        stageKit: analysis.stageKit,
        botIds: fortaStageKits.find((k) => k.key === analysis.stageKit)?.botIds
      });
    }
  }, [cluster]);

  useEffect(() => {
    if (alerts?.length > 0 && isReloading && window.scrollY > 240) {
      scrollToElement('alerts', -116);
    }
  }, [isReloading]);

  async function handleFormSubmit(values) {
    setAnalyseForm(values);
    setClusterIndex(0);
    await analyze(values);
  }

  function getEntityClusters(entityAlerts) {
    const map = new Map();

    for (const alert of entityAlerts) {
      const entityAddresses = (alert.metadata?.entityAddresses || '')
        .split(',')
        .map((a) => a.toLowerCase());

      for (const address of entityAddresses) {
        const arr = map.get(address) || [];
        arr.push(entityAddresses);
        map.set(address, arr);
      }
    }

    return map;
  }

  async function analyze(values) {
    try {
      setIsAnalysing(true);
      setProgress({ text: 'Fetching alerts...', percent: 5 });

      const { chainId, startDate, endDate } = values;
      const stageKit = fortaStageKits.find(
        (kit) => kit.key === values.stageKit
      );

      if (!stageKit) {
        throw new Error('Cannot find stage kit');
      }

      const analysisDays =
        dayjs(
          endDate || dayjs().format(SYSTEM_DATE_FORMAT),
          SYSTEM_DATE_FORMAT
        ).diff(dayjs(startDate || endDate, SYSTEM_DATE_FORMAT), 'day') + 1;

      const entityClusterAlerts = await forta.getAllAlerts({
        startDate: dayjs(startDate, SYSTEM_DATE_FORMAT)
          .subtract(7, 'day')
          .format(SYSTEM_DATE_FORMAT),
        endDate,
        botIds: [ENTITY_CLUSTER_BOT_ID],
        query: FortaExplorer.metaAlertQuery,
        onPageLoaded: (_, alerts) =>
          setProgress({
            text: `Fetching entities: ${alerts.size}`,
            percent: createInterpolator({
              inputRange: [0, (analysisDays + 5) * 100],
              outputRange: [5, 8],
              extrapolate: 'clamp'
            })(alerts.size)
          })
      });

      const clustersByAddress = getEntityClusters(entityClusterAlerts);

      logger.log('clusters', clustersByAddress);

      const botsAlerts = await forta.getAllAlerts({
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
              inputRange: [0, analysisDays * 100_000],
              outputRange: [8, 25],
              extrapolate: 'clamp'
            })(alerts.size)
          })
      });

      setProgress((v) => ({ ...v, text: 'Clustering alerts...' }));
      await delay(1);

      let alertsByAddress = new Map();
      for (const alert of botsAlerts) {
        for (const address of alert.addresses) {
          const alerts = alertsByAddress.get(address);
          if (alerts) {
            alerts.push(alert);
          } else {
            alertsByAddress.set(address, [alert]);
          }
        }
      }

      // remove burn addresses
      BURN_ADDRESSES.forEach((address) =>
        alertsByAddress.delete(address.toLowerCase())
      );
      for (const address of alertsByAddress.keys()) {
        if (
          address.indexOf('0000000000') !== -1 ||
          address.indexOf('ffffffffff') !== -1
        ) {
          // remove dummy/burn addresses
          alertsByAddress.delete(address);
        } else {
          // add single-address cluster if the address was not involved to any other clusters
          const clusters = clustersByAddress.get(address) || [[address]];
          clustersByAddress.set(address, clusters);
        }
      }

      const joinSymbol = '.';
      const clustersById = new Map();
      // collect unique clusters
      for (const clusters of clustersByAddress.values()) {
        for (const cluster of clusters) {
          // sort addresses
          cluster.sort((a, b) => a.localeCompare(b));
          // generate id hash
          const id = cluster.join(joinSymbol);
          clustersById.set(id, cluster);
        }
      }

      // clear out clusters which addresses are present in bigger ones
      for (const id of clustersById.keys()) {
        const addresses = id.split(joinSymbol);
        for (let i = 0; i < addresses.length; i++) {
          const narrowerId = addresses.slice(0, i).join(joinSymbol);
          clustersById.delete(narrowerId);
        }
      }

      // memory optimization
      clustersByAddress.clear();

      setProgress((v) => ({ ...v, text: 'Clustering alerts...' }));
      await delay(1);

      // optimization
      const stageLabelsByAlertId = new Map();
      stageKit.stages.forEach((stage) => {
        stage.alertIds.forEach((id) =>
          stageLabelsByAlertId.set(id, stage.label)
        );
      });

      const getClusterInfo = (cluster) => {
        const alertSet = new Set();

        for (const address of cluster) {
          const alerts = alertsByAddress.get(address) || [];
          for (const alert of alerts) {
            alertSet.add(alert);
          }
        }

        const alerts = [...alertSet];

        // sort alerts to make the order of the stages more informative
        alerts.sort(
          (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
        );

        // ordered all stages
        const stageLabels = [];
        // unique stages
        const uniqueStageSet = new Set();
        for (const alert of alerts) {
          const stageLabel = stageLabelsByAlertId.get(alert.alertId);
          if (stageLabel) {
            stageLabels.push(stageLabel);
            uniqueStageSet.add(stageLabel);
          }
        }

        return {
          stageLabels,
          uniqueStageSet
        };
      };

      let clusterCounter = 0;
      const potentialClusterSet = new Set();
      for (const cluster of clustersById.values()) {
        clusterCounter++;

        // update progress
        if (clusterCounter % 100 === 0) {
          setProgress({
            text: `Clustering alerts: ${clusterCounter}/${clustersById.size}`,
            percent: createInterpolator({
              inputRange: [0, alertsByAddress.size],
              outputRange: [25, 30]
            })(clusterCounter)
          });
          await delay(1);
        }

        const { uniqueStageSet } = getClusterInfo(cluster);

        if (uniqueStageSet.size >= 2) {
          potentialClusterSet.add(cluster);
        }
      }

      logger.log('clusters with 2+ stages', potentialClusterSet.size);

      setProgress((v) => ({ ...v, text: 'Filtering addresses...' }));

      const addressSet = new Set();
      for (const addresses of potentialClusterSet) {
        for (const address of addresses) {
          addressSet.add(address);
        }
      }

      logger.log('clusters addresses', addressSet.size);

      const parallelRequests = 10;
      const totalAddresses = addressSet.size;

      let addressCounter = 0;
      const potentialAddressSet = new Set();
      const addressQueue = queue(async (address, callback) => {
        setProgress({
          text: `Filtering addresses: ${++addressCounter}/${totalAddresses}`,
          percent: createInterpolator({
            inputRange: [0, totalAddresses],
            outputRange: [30, 90]
          })(addressCounter)
        });

        const meta = await getAddressMeta(address, chainId);
        if (
          !meta.isContract &&
          meta.transactionCount <= TRANSACTION_THRESHOLD
        ) {
          potentialAddressSet.add(address);
        }
        callback();
      }, parallelRequests);

      // memory optimization
      addressQueue.push([...addressSet]);
      if (addressQueue.length() > 0) await addressQueue.drain();

      const clusterSet = new Set();
      for (const addresses of potentialClusterSet) {
        const cluster = addresses.filter((a) => potentialAddressSet.has(a));
        const { stageLabels, uniqueStageSet } = getClusterInfo(cluster);

        clusterSet.add({
          addresses: cluster,
          stageLabels,
          uniqueStageSet
        });
      }

      logger.info('final clusters', clusterSet.size);

      setProgress((v) => ({ ...v, text: `Sorting clusters...` }));
      await delay(1);

      // transform Set to Array
      const clusters = [...clusterSet];
      clusters.sort(
        (group1, group2) =>
          group2.uniqueStageSet.size - group1.uniqueStageSet.size
      );

      logger.log(
        'clusters with 2+ addresses',
        clusters.filter((c) => c.addresses.length > 1)
      );

      if (stageKit.sort) {
        stageKit.sort(clusters);
      }

      if (clusters.length === 0) {
        setProgress({ text: `No alerts were clustered`, percent: 100 });
        setIsAnalysing(false);
        return;
      }

      setProgress({ text: 'Done', percent: 100 });

      const analysis = {
        chainId,
        startDate,
        endDate,
        stageKit: stageKit.key
      };

      await db.transaction(
        'rw',
        [db.combinerAnalyses, db.combinerClusters],
        async () => {
          await db.combinerAnalyses.clear();
          await db.combinerClusters.clear();

          const analysisId = await db.combinerAnalyses.add(analysis);
          db.combinerClusters.bulkAdd(
            clusters.map((g) => ({ ...g, analysisId }))
          );
        }
      );

      setAnalysis(analysis);
      setClusters(clusters);
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
        title: 'Copy link',
        icon: IconSymbols.Link,
        onClick: () => {
          copyToClipboard(getFullUrl(routes.index, clusterFilter));
        }
      },
      {
        title: 'Save',
        icon: IconSymbols.Save,
        onClick: () => setIsSaveModalOpen(true)
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
      {(!cluster || isAnalysing) && (
        <Progress
          value={
            progress || {
              text: 'As soon as you start the analysis, the progress will be displayed here.',
              percent: 0
            }
          }
          maxWidth={600}
        />
      )}
      {cluster && !isAnalysing && (
        <>
          <ClusterPanel
            cluster={cluster}
            clusterIndex={clusterIndex}
            totalClusters={clusters.length}
            stageKit={analysis.stageKit}
            onClusterIndexChange={setClusterIndex}
          />
          <AlertGroup
            id="alerts"
            title="Alerts"
            variant="red"
            alerts={alerts}
            totalAlerts={totalAlerts}
            loading={isReloading}
            loadingMore={isFetchingNextPage}
            canLoadMore={hasNextPage}
            filter={clusterFilter}
            filterEditable={true}
            filterVisible={true}
            actions={actions}
            onLoadMore={fetchNextPage}
            onFilterChange={setClusterFilter}
          />
        </>
      )}
      <SaveToWatchListModal
        open={isSaveModalOpen}
        filter={clusterFilter}
        totalAlerts={totalAlerts}
        onClose={() => setIsSaveModalOpen(false)}
      />
    </BaseLayout>
  );
}

export default CombinerPage;
