import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Body.module.scss';

function ModalBody({ children, className }) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}

ModalBody.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default ModalBody;
