import React from 'react';
import PropTypes from 'prop-types';

import styles from './WatchListForm.module.scss';

import { CSS_COLOR } from '@utils/css';
import Input from '@components/shared/Form/Input/Input';
import { IconSymbols } from '@components/shared/Icon/Icon';

function WatchListForm({ values, onChange }) {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Saved findings</h1>
      <p className={styles.lead}>
        Here you will find a list of your{' '}
        <span style={{ color: CSS_COLOR.accentYellow }}>saved alerts</span>.{' '}
        <br />
        This is a great place to add suspicious findings or already detected
        attacks.
      </p>
      <Input
        resettable
        name="search"
        variant="light"
        placeholder="Search by Name / Description"
        icon={{ left: IconSymbols.Search }}
        value={values.search}
        onChange={(e) => onChange({ search: e.target.value })}
      />
    </div>
  );
}

WatchListForm.propTypes = {
  values: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func
};

export default WatchListForm;
