import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Field.module.scss';

import { FieldTypes } from '@components/shared/Form/Field/Field.utils';

function FormField({
  type,
  name,
  label,
  error,
  invalid,
  optional,
  children,
  className
}) {
  const errors = Array.isArray(error) ? error : [error].filter((e) => !!e);
  const hasError = errors.length > 0;
  const hasCustomLabel = type === FieldTypes.CHECKBOX;

  return (
    <div className={cn(styles.root, className)}>
      {!hasCustomLabel && label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {optional && <span className={styles.optional}> (optional)</span>}
        </label>
      )}
      {children({ id: name, name, label, invalid: invalid || hasError })}
      {hasError && (
        <ul className={styles.errorList}>
          {errors.map((error) => (
            <li key={error} className={styles.errorItem}>
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.any,
  error: PropTypes.oneOfType([
    PropTypes.oneOf([false]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  optional: PropTypes.bool,
  invalid: PropTypes.bool,
  children: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default FormField;
