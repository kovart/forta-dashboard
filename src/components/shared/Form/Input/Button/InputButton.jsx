import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './InputButton.module.scss';

function InputButton({ className, children }) {
  const classNames = cn(styles.root, className);

  return <div className={classNames}>{children}</div>;
}

InputButton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default InputButton;
