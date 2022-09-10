import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './GroupPanel.module.scss';

import Button from '@components/shared/Button/Button';
import { IconSymbols } from '@components/shared/Icon/Icon';
import useStageKit from '@hooks/useStageKit';

function GroupPanel({
  group,
  groupIndex,
  stageKit,
  totalGroups,
  onGroupIndexChange,
  className
}) {
  stageKit = useStageKit(stageKit);
  const { stageLabels, lastStageLabel } = useMemo(() => {
    const order = stageKit.stages.map((s) => s.label);
    const stageLabels = group.stageLabels.slice();
    stageLabels.sort((s1, s2) => order.indexOf(s1) - order.indexOf(s2));

    return {
      stageLabels,
      lastStageLabel: stageLabels[stageLabels.length - 1]
    };
  }, [group, stageKit]);

  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.item, styles.group)}>
        <div className={styles.label}>Group</div>
        <div className={styles.value}>
          {groupIndex + 1}/{totalGroups}
        </div>
        <div className={styles.actions}>
          <Button
            icon={IconSymbols.ArrowLeft}
            disabled={groupIndex <= 0}
            onClick={() => onGroupIndexChange(groupIndex - 1)}
            variant="icon-md"
          />
          <Button
            variant="icon-md"
            icon={IconSymbols.ArrowRight}
            disabled={groupIndex + 1 >= totalGroups}
            onClick={() => onGroupIndexChange(groupIndex + 1)}
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

GroupPanel.propTypes = {
  groupIndex: PropTypes.number,
  group: PropTypes.shape({
    stageLabels: PropTypes.arrayOf(PropTypes.string)
  }),
  stageKit: PropTypes.string,
  totalGroups: PropTypes.number,
  onGroupIndexChange: PropTypes.func,
  className: PropTypes.string
};

export default GroupPanel;
