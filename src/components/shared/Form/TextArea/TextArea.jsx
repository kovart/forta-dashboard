import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './TextArea.module.scss';

const TextArea = ({
  name,
  value = '',
  minRows = 4,
  maxRows = 12,
  placeholder,
  invalid,
  disabled,
  className,
  ...props
}) => {
  if (!value) {
    value = '';
  }

  const classNames = cn(styles.root, className, {
    [styles.invalid]: invalid
  });

  return (
    <TextareaAutosize
      name={name}
      id={name}
      placeholder={placeholder}
      className={classNames}
      value={value}
      disabled={disabled}
      minRows={minRows}
      maxRows={maxRows}
      {...props}
    />
  );
};

TextArea.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func
};

export default TextArea;
