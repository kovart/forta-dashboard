import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  useFloating,
  offset,
  shift,
  flip,
  size,
  autoUpdate
} from '@floating-ui/react-dom-interactions';
import useOutsideClick from 'react-cool-onclickoutside';

import { POPOVER_PLACEMENT } from './Popover.utils';
import styles from './Popover.module.scss';

function Popover({
  open,
  anchorElRef,
  containerElRef,
  children,
  placement = POPOVER_PLACEMENT.bottomStart,
  preferredWidth,
  maxHeight = 500,
  className,
  onClose
}) {
  const contentRef = useRef();
  const { x, y, reference, floating, strategy } = useFloating({
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    placement: placement,
    middleware: [
      offset(8),
      shift(),
      flip(),
      size({
        padding: 8,
        apply({ availableWidth, availableHeight }) {
          Object.assign(contentRef.current.style, {
            width: Math.min(preferredWidth, availableWidth) + 'px',
            maxHeight: `${Math.min(maxHeight, availableHeight)}px`
          });
        }
      })
    ]
  });

  useLayoutEffect(() => {
    if (open) {
      reference(anchorElRef.current);
    }
  }, [open, anchorElRef]);

  useOutsideClick(onClose, {
    refs: [containerElRef]
  });

  return (
    <div
      ref={floating}
      className={cn(styles.root, { [styles.open]: open })}
      style={{
        top: y ?? 0,
        left: x ?? 0,
        position: strategy
      }}
    >
      <div
        ref={contentRef}
        className={cn(styles.content, className, { [styles.open]: open })}
      >
        {children}
      </div>
    </div>
  );
}

Popover.propTypes = {
  open: PropTypes.bool,
  anchorElRef: PropTypes.any,
  containerElRef: PropTypes.object,
  placement: PropTypes.oneOf(Object.values(POPOVER_PLACEMENT)),
  preferredWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  onClose: PropTypes.func
};

export { POPOVER_PLACEMENT };

export default Popover;
