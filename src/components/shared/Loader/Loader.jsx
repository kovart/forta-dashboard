import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Loader.module.scss';

import FortaAsteriskImage from '@assets/images/forta_asterisk_light.png';

function Loader({
  variant = 'asterisk',
  position = 'absolute',
  spinnerSize = 'md',
  bg = 'translucent',
  height, // for static position
  className,
  onClick
}) {
  const classNames = cn(styles.loader, className, {
    [styles[variant]]: typeof variant === 'string',
    [styles[position]]: typeof position === 'string',
    [styles[bg]]: typeof background === 'string'
  });

  return (
    <div className={classNames} style={{ height }} onClick={onClick}>
      {variant === 'asterisk' && (
        <div className={styles.asterisk}>
          <img
            src={FortaAsteriskImage}
            alt="Forta asterisk"
            aria-hidden="true"
            className={cn(styles.spinner, {
              [styles[spinnerSize]]: spinnerSize
            })}
          />
        </div>
      )}
    </div>
  );
}

Loader.propTypes = {
  variant: PropTypes.oneOf(['asterisk']),
  bg: PropTypes.oneOf(['fill', 'translucent', 'transparent']),
  spinnerSize: PropTypes.oneOf(['md']),
  position: PropTypes.oneOf(['absolute', 'fixed', 'static']),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Loader;
