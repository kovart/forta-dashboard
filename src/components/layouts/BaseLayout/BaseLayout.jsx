import React from 'react';
import PropTypes from 'prop-types';

import styles from './BaseLayout.module.scss';

import Header from '@components/shared/Header/Header';

const BaseLayout = ({ children }) => (
  <div className={styles.root}>
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
);

BaseLayout.propTypes = {
  children: PropTypes.any
};

export default BaseLayout;
