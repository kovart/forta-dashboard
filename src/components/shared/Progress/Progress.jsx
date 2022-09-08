import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import interpolate from 'color-interpolate';

import styles from './Progress.module.scss';

import { CSS_COLOR } from '@utils/css';
import Icon, { IconSymbols } from '@components/shared/Icon/Icon';

function Progress({ value, maxWidth, className }) {
  const { text, percent } = value;

  const colormap = useMemo(
    () =>
      interpolate([
        CSS_COLOR.neutral50,
        CSS_COLOR.accentBlue2,
        CSS_COLOR.accentGreen
      ]),
    []
  );

  return (
    <div className={cn(styles.root, className)} style={{ maxWidth }}>
      {text != null && (
        <div className={styles.text}>
          <Icon
            size={18}
            symbol={IconSymbols.Terminal}
            className={styles.icon}
          />
          {text}
        </div>
      )}
      {percent != null && (
        <div className={styles.indicatorBar}>
          <div
            className={styles.progressBar}
            style={{
              width: percent + '%',
              backgroundColor: colormap(percent / 100)
            }}
          >
            <div className={styles.shimmer} />
          </div>
        </div>
      )}
    </div>
  );
}

Progress.propTypes = {
  value: PropTypes.shape({
    text: PropTypes.string,
    percent: PropTypes.number
  }),
  maxWidth: PropTypes.number,
  className: PropTypes.string
};

export default Progress;
