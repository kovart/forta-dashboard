import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Loader.module.scss';

import FortaAsteriskImage from '@assets/images/asterisk-light.png';

function Loader({
  spinner = 'asterisk',
  position = 'absolute',
  bg: background = 'translucent',
  height, // for static position
  className,
  onClick
}) {
  const classNames = cn(
    styles.loader,
    styles[position],
    styles[background],
    className
  );

  return (
    <div className={classNames} style={{ height }} onClick={onClick}>
      {spinner === 'asterisk' && (
        <div className={styles.asterisk}>
          <img
            src={FortaAsteriskImage}
            alt="Forta asterisk"
            aria-hidden="true"
            className={styles.spinner}
          />
        </div>
      )}
      <div className={styles.bg} />
    </div>
  );
}

Loader.propTypes = {
  spinner: PropTypes.oneOf(['asterisk']),
  bg: PropTypes.oneOf(['fill', 'translucent', 'transparent', 'shimmer']),
  position: PropTypes.oneOf(['absolute', 'fixed', 'static']),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Loader;
