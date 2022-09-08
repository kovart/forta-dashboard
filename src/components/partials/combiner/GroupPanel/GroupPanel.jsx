import React from 'react';
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
          {group.stages.length}/{stageKit.stages.length}
        </div>
      </div>
      <div className={styles.sep} />
      <div className={cn(styles.item, styles.lastStage)}>
        <div className={styles.label}>Last stage</div>
        <div
          className={styles.value}
          style={{
            color: stageKit.stages.find(
              (stage) => stage.label === group.stages[group.stages.length - 1]
            )?.color
          }}
        >
          {group.stages[group.stages.length - 1]}
        </div>
      </div>
    </div>
  );
}

GroupPanel.propTypes = {
  groupIndex: PropTypes.number,
  group: PropTypes.shape({
    stages: PropTypes.arrayOf(PropTypes.string)
  }),
  stageKit: PropTypes.string,
  totalGroups: PropTypes.number,
  onGroupIndexChange: PropTypes.func,
  className: PropTypes.string
};

export default GroupPanel;
