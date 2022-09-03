import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

import LogoImage from '@assets/images/logo.svg';
import { PROJECT_NAME } from '@constants/common';

const SIZE_MAP = {
  md: 21
};

function Logo({ size = 'md', href = '/', className }) {
  const Element = href ? Link : 'div';

  const props = useMemo(() => (href ? { to: href } : {}), [href]);

  return (
    <Element className={cn(styles.root, className)} {...props}>
      <img src={LogoImage} alt={PROJECT_NAME} height={SIZE_MAP[size]} />
    </Element>
  );
}

Logo.propTypes = {
  size: PropTypes.oneOf(['md']),
  href: PropTypes.string,
  className: PropTypes.string
};

export default Logo;
