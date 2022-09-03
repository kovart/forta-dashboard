import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Header.module.scss';
import Navigation from './Navigation/Navigation';

import Logo from '@components/shared/Logo/Logo';
import Button from '@components/shared/Button/Button';
import { IconSymbols } from '@components/shared/Icon/Icon';
import routes from '@constants/routes';

const items = [
  {
    to: routes.index,
    label: 'Explorer'
  },
  {
    to: routes.combiner,
    label: 'Combiner'
  },
  {
    to: routes.watchlist,
    label: 'Watchlist'
  },
  {
    to: routes.findings,
    label: 'Findings'
  }
];

function Header({ className }) {
  return (
    <div className={cn(styles.root, className)}>
      <Logo className={styles.logo} />
      <Navigation items={items} className={styles.nav} />
      <Button variant="outline" endIcon={IconSymbols.Zap}>
        Connect
      </Button>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
