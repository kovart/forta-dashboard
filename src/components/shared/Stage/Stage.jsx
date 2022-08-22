import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Stage.module.scss';

import { StageType } from '@constants/types';

function Stage({ stage, className }) {
  return (
    <div className={cn(styles.root, className)} style={{ color: stage.color }}>
      {stage.label}
    </div>
  );
}

Stage.propTypes = {
  stage: StageType.isRequired,
  className: PropTypes.string
};

export default Stage;
