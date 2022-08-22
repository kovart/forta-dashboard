import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

import Spinner from '@components/shared/Spinner/Spinner';
import Icon from '@components/shared/Icon/Icon';

const Button = React.forwardRef(function Button(
  {
    as,
    icon,
    startIcon,
    endIcon,
    type,
    variant,
    to,
    href,
    fluid,
    inline = true,
    width,
    maxWidth,
    disabled,
    loading,
    loadingPosition = 'end',
    className,
    children,
    onClick,
    ...props
  },
  ref
) {
  const isLinkComponent =
    to && !disabled && type !== 'submit' && type !== 'button';
  let Element = isLinkComponent ? Link : 'button';
  let componentProps = { ...props };

  if (icon && !startIcon && !endIcon) startIcon = icon;
  if (typeof startIcon === 'string') {
    startIcon = { symbol: startIcon };
  }
  if (typeof endIcon === 'string') {
    endIcon = { symbol: endIcon };
  }

  if (to) {
    componentProps.to = href;
  } else if (href) {
    componentProps.href = href;
    componentProps.rel = 'noopener noreferrer';
    as = 'a';
  }

  if (as) {
    Element = as;
  }

  const classNames = cn(styles.root, className, {
    [styles[variant]]: variant,
    [styles.fluid]: fluid,
    [styles.inline]: inline
  });

  return (
    <Element
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames}
      style={{ maxWidth, width }}
      {...componentProps}
    >
      {startIcon && (!loading || loadingPosition !== 'start') && (
        <Icon
          size={null}
          symbol={startIcon.symbol}
          style={startIcon.style}
          color={startIcon.color}
          className={cn(styles.icon, startIcon.className)}
        />
      )}
      {loading && loadingPosition === 'start' && (
        <Spinner size="sm" color="inherit" className={styles.spinner} />
      )}
      {children && <span className={styles.value}>{children}</span>}
      {endIcon && (!loading || loadingPosition !== 'end') && (
        <Icon
          size={null}
          symbol={endIcon.symbol}
          style={endIcon.style}
          color={endIcon.color}
          className={cn(styles.icon, endIcon.className)}
        />
      )}
      {loading && loadingPosition === 'end' && (
        <Spinner size="sm" color="inherit" className={styles.spinner} />
      )}
    </Element>
  );
});

const IconType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    symbol: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.object
  })
]);

Button.propTypes = {
  as: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'text-md',
    'text-inherit',
    'icon-base',
    'icon-md'
  ]).isRequired,
  icon: IconType,
  startIcon: IconType,
  endIcon: IconType,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.bool,
  loadingPosition: PropTypes.oneOf(['start', 'end']),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  to: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  inline: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func
};

export default Button;
