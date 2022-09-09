import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import MenuItem from './Item/Item';
import styles from './Menu.module.scss';

import Popover, { POPOVER_PLACEMENT } from '@components/shared/Popover/Popover';

export const MenuContext = React.createContext({
  shouldCloseOnClick: true,
  close: () => {}
});

function Menu({
  children,
  placement,
  preferredWidth,
  maxHeight,
  strategy,
  shouldCloseOnClick = true,
  renderElement,
  className
}) {
  const elementRef = useRef();
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const context = {
    shouldCloseOnClick,
    close: () => setIsOpen(false)
  };

  return (
    <MenuContext.Provider value={context}>
      <div ref={containerRef}>
        {renderElement({
          open: isOpen,
          ref: elementRef,
          toggle: () => setIsOpen((v) => !v)
        })}
        <Popover
          open={isOpen}
          strategy={strategy}
          anchorElRef={elementRef}
          containerElRef={containerRef}
          className={cn(styles.menu, className)}
          placement={placement}
          preferredWidth={preferredWidth}
          maxHeight={maxHeight}
          onClose={() => setIsOpen(false)}
        >
          {children}
        </Popover>
      </div>
    </MenuContext.Provider>
  );
}

Menu.Item = MenuItem;

Menu.Separator = function Separator() {
  return <div className={styles.separator} />;
};

Menu.propTypes = {
  renderElement: PropTypes.func.isRequired,
  placement: PropTypes.oneOf(Object.values(POPOVER_PLACEMENT)),
  shouldCloseOnClick: PropTypes.bool,
  strategy: PropTypes.oneOf(['fixed', 'absolute']),
  preferredWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string
};

export default Menu;
