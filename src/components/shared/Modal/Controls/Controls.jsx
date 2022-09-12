import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Controls.module.scss';

import Button from '@components/shared/Button/Button';

function ModalControls({ children, actions, alignment = 'row', className }) {
  return (
    <div className={cn(styles.root, className, styles[alignment])}>
      {children}
      {actions.map((action) => (
        <Button
          type={action.type}
          key={action.label}
          variant={action.primary ? 'primary' : 'secondary'}
          disabled={action.disabled}
          className={action.primary ? undefined : styles.secondaryButton}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

ModalControls.propTypes = {
  children: PropTypes.any,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      primary: PropTypes.bool,
      onClick: PropTypes.func
    })
  ).isRequired,
  alignment: PropTypes.oneOf(['row']),
  className: PropTypes.string
};

export default ModalControls;
