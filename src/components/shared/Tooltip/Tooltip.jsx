import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as TippyTooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

function Tooltip({
  title,
  position = 'top',
  hideOnClick = true,
  children,
  ...props
}) {
  return (
    <TippyTooltip
      title={title}
      position={position}
      duration={150}
      distance={16}
      hideOnClick={hideOnClick}
      {...props}
    >
      {children}
    </TippyTooltip>
  );
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.string,
  trigger: PropTypes.string,
  hideOnClick: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any
};

export default Tooltip;
