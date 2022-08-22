import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Section.module.scss';

function UiKitSection({ title, direction = 'row', children, className }) {
  return (
    <section className={cn(styles.root, className, styles[direction])}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

UiKitSection.propTypes = {
  title: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
  children: PropTypes.any,
  className: PropTypes.string
};

export default UiKitSection;
