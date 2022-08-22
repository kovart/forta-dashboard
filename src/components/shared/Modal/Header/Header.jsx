import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Header.module.scss';

import Button from '@components/shared/Button/Button';
import { IconSymbols } from '@components/shared/Icon/Icon';

function ModalHeader({ title, onClose, className }) {
  return (
    <div className={cn(styles.root, className)}>
      <h2 className={styles.title}>{title}</h2>
      {onClose && (
        <Button
          variant="icon-md"
          icon={IconSymbols.Cross}
          className={styles.closeButton}
          onClick={onClose}
        />
      )}
    </div>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default ModalHeader;
