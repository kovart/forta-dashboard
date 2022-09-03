import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Chip.module.scss';

import Icon, { IconSymbols } from '@components/shared/Icon/Icon';

const Chip = React.forwardRef(function Chip(
  {
    icon,
    startIcon,
    endIcon,
    variant = 'outline',
    onRemove,
    onClick,
    empty = false,
    removable = !!onRemove,
    clickable = !!onClick,
    disabled,
    checked,
    children,
    className
  },
  ref
) {
  if (!startIcon && !endIcon && icon) {
    startIcon = icon;
  }

  function handleRemove(e) {
    e.stopPropagation();
    onRemove();
  }

  return (
    <div
      ref={ref}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(styles.root, className, styles[variant], {
        [styles.clickable]: clickable,
        [styles.removable]: removable,
        [styles.disabled]: disabled,
        [styles.checked]: checked,
        [styles.empty]: empty
      })}
      onClick={clickable ? onClick : undefined}
    >
      {startIcon && (
        <Icon
          symbol={startIcon.symbol}
          style={{ color: startIcon.color }}
          className={styles.icon}
        />
      )}
      <span className={styles.content}>{children}</span>
      {endIcon && (
        <Icon
          symbol={endIcon.symbol}
          style={{ color: endIcon.color }}
          className={styles.icon}
        />
      )}
      {removable && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
        >
          <div className={styles.circle}>
            <Icon symbol={IconSymbols.Cross} size={12} />
          </div>
        </button>
      )}
    </div>
  );
});

const IconType = PropTypes.shape({
  symbol: PropTypes.string.isRequired,
  color: PropTypes.string
});

Chip.propTypes = {
  variant: PropTypes.oneOf(['outline']),
  icon: IconType,
  startIcon: IconType,
  endIcon: IconType,
  className: PropTypes.string,
  children: PropTypes.any,
  removable: PropTypes.bool,
  clickable: PropTypes.bool,
  checked: PropTypes.bool,
  empty: PropTypes.bool,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
  onClick: PropTypes.func
};

export default Chip;
