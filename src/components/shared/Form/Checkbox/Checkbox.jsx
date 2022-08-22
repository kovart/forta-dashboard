import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Checkbox.module.scss';

import Mark from '@components/shared/Form/Mark/Mark';

function Checkbox({
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
      <Mark
        className={styles.mark}
        checked={checked}
        disabled={disabled}
        variant="checkbox"
      />
      <div className={styles.content}>{children}</div>
    </label>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default Checkbox;
