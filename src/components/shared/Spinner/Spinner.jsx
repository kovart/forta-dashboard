import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Spinner.module.scss';

function Spinner({
  variant = 'dual-ring',
  size = 'md',
  color = 'primary',
  className
}) {
  return (
    <div
      className={cn(styles.spinner, className, {
        [styles[`spinner--${size}`]]: typeof size === 'string',
        [styles[`spinner--${variant}`]]: typeof variant === 'string',
        [styles[color]]: color
      })}
    />
  );
}

Spinner.propTypes = {
  variant: PropTypes.oneOf(['dual-ring']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'inherit']),
  className: PropTypes.string
};

export default Spinner;
