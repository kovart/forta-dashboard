import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Switcher.module.scss';

function Switcher({ name, value, options, onChange, className }) {
  return (
    <div className={cn(styles.root, className)}>
      {options.map((option) => (
        <label
          key={option.label}
          className={cn(styles.option, {
            [styles.active]: value === option.value
          })}
        >
          {option.label}
          <input
            name={name}
            type="radio"
            checked={value === option.value}
            value={option.value}
            onChange={onChange}
          />
        </label>
      ))}
    </div>
  );
}

Switcher.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default Switcher;
