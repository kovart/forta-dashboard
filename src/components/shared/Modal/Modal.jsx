import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ModalHeader from './Header/Header';
import ModalControls from './Controls/Controls';
import ModalBody from './Body/Body';
import styles from './Modal.module.scss';

const ANIMATION_TIMEOUT = 300;

const Modal = (props) => {
  const {
    open,
    size = 'md',
    padding = 'sm',
    closable = true,
    children,
    className,
    onClose,
    ...restProps
  } = props;

  const modalClassNames = cn(
    styles.root,
    [styles[size]],
    [styles['p-' + padding]],
    className
  );

  return (
    <ReactModal
      preventScroll
      isOpen={open}
      closeTimeoutMS={ANIMATION_TIMEOUT}
      overlayClassName={styles.overlay}
      className={modalClassNames}
      onRequestClose={closable ? onClose : () => {}}
      parentSelector={() => document.body}
      shouldCloseOnEsc={closable}
      shouldCloseOnOverlayClick={closable}
      {...restProps}
    >
      {children}
    </ReactModal>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['sm', 'md']),
  padding: PropTypes.oneOf(['sm']),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      href: PropTypes.string,
      primary: PropTypes.bool
    })
  ),
  closable: PropTypes.bool,
  hasCloseButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func
};

Modal.Header = ModalHeader;
Modal.Controls = ModalControls;
Modal.Body = ModalBody;

export default Modal;
