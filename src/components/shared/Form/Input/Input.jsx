import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import moduleStyles from './Input.module.scss';
import InputSubComponent from './SubComponent/InputSubComponent';
import InputButton from './Button/InputButton';

import Icon, { IconSymbols } from '@components/shared/Icon/Icon';
import Button from '@components/shared/Button/Button';
import { mergeStyles } from '@utils/helpers';

const Input = forwardRef(function Input(
  {
    name,
    type = 'text',
    value,
    icon,
    variant = 'dark',
    placeholder,
    components,
    invalid,
    resettable = false,
    disabled,
    className,
    styles: injectedStyles,
    ...props
  },
  ref
) {
  const [shouldRevealPassword, setShouldRevealPassword] = useState(false);
  const isPassword = type === 'password';

  const styles = mergeStyles(moduleStyles, injectedStyles);

  if (value === null) {
    value = '';
  }

  components = {
    left: [],
    right: [],
    ...components
  };

  if (icon) {
    const getIconComponent = (symbol) => ({
      width: 18,
      render: () => (
        <Icon symbol={symbol} size={null} className={styles.icon} />
      ),
      noMouse: true
    });

    if (icon.left) {
      components.left.unshift(getIconComponent(icon.left));
    }

    if (icon.right) {
      components.right.unshift(getIconComponent(icon.right));
    }
  }

  if (isPassword) {
    components.right.push({
      render: () => (
        <InputButton>
          <Button
            type="button"
            variant="icon-base"
            icon={shouldRevealPassword ? IconSymbols.EyeOff : IconSymbols.Eye}
            onClick={() => setShouldRevealPassword((v) => !v)}
            className={styles.button}
          />
        </InputButton>
      ),
      width: 40
    });
  }

  if (resettable && value) {
    components.right.push({
      render: () => (
        <InputButton>
          <Button
            type="button"
            variant="icon-base"
            icon={IconSymbols.Cross}
            onClick={() => props.onChange({ target: { name, value: '' } })}
            className={styles.button}
          />
        </InputButton>
      ),
      width: 40
    });
  }

  const rootClassNames = cn(styles.root, className, {
    [styles[variant]]: variant
  });

  const inputClassNames = cn(styles.input, {
    [styles.invalid]: invalid,
    [styles[variant]]: variant
  });

  const inputStyle = {
    paddingLeft:
      components.left.length > 0
        ? components.left.reduce((acc, c) => acc + c.width + 8, 10)
        : null,
    paddingRight:
      components.right.length > 0
        ? components.right.reduce((acc, c) => acc + c.width + 8, 10)
        : null
  };

  return (
    <div className={rootClassNames}>
      <div className={styles.wrapper}>
        {components.left.map((component, i) => (
          <InputSubComponent
            key={i}
            position="left"
            component={component}
            previousComponents={components.left.slice(0, i)}
            props={{ value, invalid, disabled }}
          />
        ))}
        <input
          type={shouldRevealPassword ? 'text' : type}
          name={name}
          id={name}
          ref={ref}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          style={inputStyle}
          className={inputClassNames}
          {...props}
        />
        {components.right.map((component, i) => (
          <InputSubComponent
            key={i}
            position="right"
            component={component}
            previousComponents={components.right.slice(0, i)}
            props={{ value, invalid, disabled }}
          />
        ))}
      </div>
    </div>
  );
});

Input.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string
  }),
  components: PropTypes.shape({
    left: PropTypes.arrayOf(
      PropTypes.shape({
        render: PropTypes.func,
        width: PropTypes.number
      })
    ),
    right: PropTypes.arrayOf(
      PropTypes.shape({
        render: PropTypes.func,
        width: PropTypes.number
      })
    )
  }),
  resettable: PropTypes.bool,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
