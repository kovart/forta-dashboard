import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './SeverityFilterModal.module.scss';

import Modal from '@components/shared/Modal/Modal';
import Checkable from '@components/shared/Form/Checkable/Checkable';
import { SEVERITY } from '@constants/common';

function SeverityFilterModal({
  open = false,
  severities = [],
  className,
  onClose,
  onSeveritiesChange
}) {
  const [localSeverities, setLocalSeverities] = useState([]);

  useLayoutEffect(() => {
    setLocalSeverities(severities);
  }, [open]);

  function handleApply() {
    const order = Object.values(SEVERITY);
    localSeverities.sort((s1, s2) => order.indexOf(s1) - order.indexOf(s2));
    onSeveritiesChange(localSeverities);
    onClose();
  }

  return (
    <Modal
      open={open}
      size="sm"
      onClose={onClose}
      className={cn(styles.root, className)}
    >
      <Modal.Header title="Filter by severity" onClose={onClose} />
      <Modal.Body className={styles.body}>
        {Object.entries(SEVERITY).map(([key, value]) => {
          const isChecked = localSeverities.includes(value);
          return (
            <Checkable
              key={key}
              name={key}
              className={styles.item}
              checked={isChecked}
              onChange={() =>
                setLocalSeverities(
                  isChecked
                    ? localSeverities.filter((s) => s !== value)
                    : [value, ...localSeverities]
                )
              }
            >
              <div className={cn(styles.severity, styles[key])}>{value}</div>
            </Checkable>
          );
        })}
      </Modal.Body>
      <Modal.Controls
        actions={[
          {
            label: 'Apply',
            primary: true,
            onClick: handleApply
          },
          {
            label: 'Cancel',
            onClick: onClose
          }
        ]}
      />
    </Modal>
  );
}

SeverityFilterModal.propTypes = {
  open: PropTypes.bool,
  severities: PropTypes.oneOf(Object.values(SEVERITY)),
  onClose: PropTypes.func,
  onSeveritiesChange: PropTypes.func,
  className: PropTypes.string
};

export default SeverityFilterModal;
