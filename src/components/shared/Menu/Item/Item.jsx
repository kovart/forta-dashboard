import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { MenuContext } from '../Menu';

import styles from './Item.module.scss';

import Icon from '@components/shared/Icon/Icon';

function MenuItem({
  icon,
  startIcon,
  endIcon,
  href,
  selected = false,
  children,
  onClick = () => {},
  className
}) {
  const { shouldCloseOnClick, close } = useContext(MenuContext);

  let Element = href ? 'a' : 'button';
  let props = {};

  if (href) {
    props.href = href;
    props.target = '_blank';
    props.rel = 'noreferrer noopener';
  }

  if (icon && !startIcon && !endIcon) {
    startIcon = icon;
  }

  function handleClick() {
    onClick();
    if (shouldCloseOnClick) {
      close();
    }
  }

  return (
    <Element
      className={cn(styles.root, className, { [styles.selected]: selected })}
      onClick={handleClick}
      {...props}
    >
      {startIcon && <Icon symbol={startIcon} className={styles.icon} />}
      <span className={styles.content}>{children}</span>
      {endIcon && <Icon symbol={endIcon} className={styles.icon} />}
    </Element>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.string,
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
  href: PropTypes.string,
  selected: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default MenuItem;
