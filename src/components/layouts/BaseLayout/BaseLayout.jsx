import React from 'react';
import PropTypes from 'prop-types';

import styles from './BaseLayout.module.scss';

import Logo from '@components/shared/Logo/Logo';

const BaseLayout = ({ children, renderHeaderPanel = () => {} }) => (
  <div className={styles.root}>
    <header className={styles.header}>
      <Logo />
      {renderHeaderPanel && (
        <div className={styles.headerPanel}>{renderHeaderPanel()}</div>
      )}
    </header>
    <main className={styles.main}>{children}</main>
  </div>
);

BaseLayout.propTypes = {
  children: PropTypes.any,
  renderHeaderPanel: PropTypes.func
};

export default BaseLayout;
