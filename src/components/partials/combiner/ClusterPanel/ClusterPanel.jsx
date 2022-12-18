import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './ClusterPanel.module.scss';

import Button from '@components/shared/Button/Button';
import { IconSymbols } from '@components/shared/Icon/Icon';
import useStageKit from '@hooks/useStageKit';

function ClusterPanel({
  cluster,
  clusterIndex,
  totalClusters,
  stageKit,
  onClusterIndexChange,
  className
}) {
  stageKit = useStageKit(stageKit);

  const { stageLabels, lastStageLabel } = useMemo(() => {
    const order = stageKit.stages.map((s) => s.label);
    const stageLabels = cluster.stageLabels.slice();
    stageLabels.sort((s1, s2) => order.indexOf(s1) - order.indexOf(s2));

    return {
      stageLabels: [...cluster.uniqueStageSet],
      lastStageLabel: stageLabels[stageLabels.length - 1]
    };
  }, [cluster, stageKit]);

  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.item, styles.group)}>
        <div className={styles.label}>Group</div>
        <div className={styles.value}>
          {clusterIndex + 1}/{totalClusters}
        </div>
        <div className={styles.actions}>
          <Button
            icon={IconSymbols.ArrowLeft}
            disabled={clusterIndex <= 0}
            onClick={() => onClusterIndexChange(clusterIndex - 1)}
            variant="icon-md"
          />
          <Button
            variant="icon-md"
            icon={IconSymbols.ArrowRight}
            disabled={clusterIndex + 1 >= totalClusters}
            onClick={() => onClusterIndexChange(clusterIndex + 1)}
          />
        </div>
      </div>
      <div className={cn(styles.item, styles.stagesPassed)}>
        <div className={styles.label}>Stage passed</div>
        <div className={styles.value}>
          {stageLabels.length}/{stageKit.stages.length}
        </div>
      </div>
      <div className={styles.sep} />
      <div className={cn(styles.item, styles.lastStage)}>
        <div className={styles.label}>Last stage</div>
        <div
          className={styles.value}
          style={{
            color: stageKit.stages.find(
              (stage) => stage.label === lastStageLabel
            )?.color
          }}
        >
          {lastStageLabel}
        </div>
      </div>
    </div>
  );
}

ClusterPanel.propTypes = {
  clusterIndex: PropTypes.number,
  cluster: PropTypes.shape({
    stageLabels: PropTypes.arrayOf(PropTypes.string),
    uniqueStageSet: PropTypes.instanceOf(Set)
  }),
  stageKit: PropTypes.string,
  totalClusters: PropTypes.number,
  onClusterIndexChange: PropTypes.func,
  className: PropTypes.string
};

export default ClusterPanel;
