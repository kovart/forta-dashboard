import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Logo.module.scss';

import LogoImage from '@assets/images/logo.svg';
import { PROJECT_NAME } from '@constants/common';

function Logo({ className }) {
  return (
    <div className={cn(styles.root, className)}>
      <img src={LogoImage} alt={PROJECT_NAME} />
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string
};

export default Logo;
