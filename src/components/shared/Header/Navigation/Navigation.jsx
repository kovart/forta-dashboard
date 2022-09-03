import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';

function Navigation({ items, className }) {
  return (
    <nav className={cn(styles.root, className)}>
      <ul>
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                isActive ? cn(styles.navLink, styles.active) : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
      exact: PropTypes.bool
    })
  ),
  className: PropTypes.string
};

export default Navigation;
