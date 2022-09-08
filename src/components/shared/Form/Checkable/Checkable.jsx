import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Checkable.module.scss';

import Mark from '@components/shared/Form/Mark/Mark';

function Checkable({
  name,
  value,
  checked = false,
  disabled = false,
  invalid = false,
  children,
  className,
  ...props
}) {
  const classNames = cn(styles.root, className, {
    [styles.disabled]: disabled,
    [styles.checked]: checked
  });

  return (
    <label className={classNames}>
      <input
        name={name}
        type="checkbox"
        checked={checked}
        value={value}
        className={styles.input}
        disabled={disabled}
        aria-invalid={String(invalid)}
        {...props}
      />
      <div className={styles.content}>{children}</div>
      <Mark
        className={styles.mark}
        checked={checked}
        disabled={disabled}
        variant="checkbox"
      />
    </label>
  );
}

Checkable.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,

  className: PropTypes.string
};

export default Checkable;
