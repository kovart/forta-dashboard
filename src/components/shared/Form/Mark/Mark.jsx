import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Mark.module.scss';

import Icon, { IconSymbols } from '@components/shared/Icon/Icon';

const Mark = ({ checked, disabled, variant, className, onClick }) => {
  const classNames = cn(styles.root, className, {
    [styles.disabled]: disabled,
    [styles.checked]: checked,
    [styles[variant]]: variant
  });

  return (
    <span className={classNames} aria-hidden="true" onClick={onClick}>
      {checked &&
        (variant === 'checkbox' ? (
          <Icon symbol={IconSymbols.Check} className={styles.icon} size={16} />
        ) : (
          <Icon
            symbol={IconSymbols.CheckRadio}
            className={styles.icon}
            size={10}
          />
        ))}
    </span>
  );
};

Mark.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Mark;
