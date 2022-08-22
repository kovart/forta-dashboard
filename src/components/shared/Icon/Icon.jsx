import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import styles from './Icon.module.scss';

const Icon = ({ symbol, className, size, color, style, ...props }) => {
  const componentInlineStyles = style ? Object.assign({}, style) : {};

  if (size) {
    componentInlineStyles.width = componentInlineStyles.height = size;
  }
  if (color) {
    componentInlineStyles.color = color;
  }

  return (
    <svg
      viewBox={symbol?.viewBox}
      className={cls(styles.icon, className)}
      style={componentInlineStyles}
      aria-hidden="true"
      {...props}
    >
      <use xlinkHref={'#' + symbol} />
    </svg>
  );
};

Icon.propTypes = {
  symbol: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};

export { IconSymbols } from './Icon.utils';

export default Icon;
