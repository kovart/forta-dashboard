import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './InputSubComponent.module.scss';

function InputSubComponent({ position, component, previousComponents, props }) {
  if (!component) {
    return null;
  }

  const indent = previousComponents.reduce(
    (acc, curr) => acc + (curr.width || 0),
    0
  );

  return (
    <span
      className={cn(styles.root, {
        [styles[position]]: typeof position === 'string',
        [styles.noMouse]: component.noMouse
      })}
      style={{ [position]: indent }}
    >
      <span className={styles.container}>{component.render(props)}</span>
    </span>
  );
}

InputSubComponent.propTypes = {
  position: PropTypes.oneOf(['right', 'left']).isRequired,
  component: PropTypes.shape({
    render: PropTypes.func,
    width: PropTypes.number,
    noMouse: PropTypes.bool
  }),
  previousComponents: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number
    })
  ),
  props: PropTypes.object
};

export default InputSubComponent;
