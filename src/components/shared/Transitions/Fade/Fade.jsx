import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';

import './Fade.module.scss';

const Fade = ({ visible, className, children }) => (
  <CSSTransition
    unmountOnExit
    in={visible}
    timeout={300}
    classNames={cn('fade-transition', className)}
  >
    {children}
  </CSSTransition>
);

Fade.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string
};

export default Fade;
