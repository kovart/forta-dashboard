import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Message.module.scss';

function FormMessage({ message, type = 'error', alignment, className }) {
  const messages = Array.isArray(message) ? message : [message];

  const classNames = cn(styles.root, className, {
    [styles[type]]: type,
    [styles[alignment]]: alignment
  });

  if (!message) {
    return null;
  }

  return (
    <div className={classNames}>
      {messages.map((message) => (
        <div key={message} className={styles.message}>
          {message}
        </div>
      ))}
    </div>
  );
}

FormMessage.propTypes = {
  type: PropTypes.oneOf(['error']),
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  alignment: PropTypes.oneOf(['left', 'center']),
  className: PropTypes.string
};

export default FormMessage;
