import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { MenuContext } from '../Menu';

import styles from './Item.module.scss';

import Icon from '@components/shared/Icon/Icon';

function MenuItem({
  icon,
  selected = false,
  children,
  onClick = () => {},
  className
}) {
  const { shouldCloseOnClick, close } = useContext(MenuContext);

  function handleClick() {
    onClick();
    if (shouldCloseOnClick) {
      close();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(styles.root, className, { [styles.selected]: selected })}
      onClick={handleClick}
    >
      {icon && <Icon symbol={icon} className={styles.icon} />}
      {children}
    </div>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.string,
  selected: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default MenuItem;
