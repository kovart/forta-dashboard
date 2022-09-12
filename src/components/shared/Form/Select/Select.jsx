import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ReactSelect from 'react-select';
import AsyncReactSelect from 'react-select/async';

import styles from './Select.module.scss';

import { useSelectComponents } from '@components/shared/Form/Select/Select.partials';

function Select({
  name,
  value,
  options = [],
  searchable = false,
  clearable = false,
  invalid = false,
  loading = false,
  async = false,
  icon = null,
  menuPosition = 'absolute',
  components,
  className,
  onChange = () => {},
  onCheckEquality = (item1, item2) => item1 === item2,
  onOptionsRequest,
  ...props
}) {
  value = useMemo(() => {
    if (async || value == null || !options || value === '') {
      return value;
    } else {
      return options.find((option) => onCheckEquality(option.value, value));
    }
  }, [value, options]);

  components = useSelectComponents({ icon, components });

  const [inputValue, setInputValue] = useState(() => value?.label || '');

  useEffect(() => {
    setInputValue(value?.label || '');
  }, [value]);

  // hack that allows to stylize fixed positioned menu
  useLayoutEffect(() => {
    if (!window.document.body.classList.contains(styles.global)) {
      window.document.body.classList.add(styles.global);
      return () => window.document.body.classList.remove(styles.global);
    }
  }, []);

  function handleSelect(props) {
    // 'props' can be null if select has been cleared
    const value = props?.value != null ? props?.value : null;
    onChange({ target: { name, value } });
  }

  function handleInputChange(inputValue, { action }) {
    if (action === 'input-blur') {
      setInputValue(value?.label || '');
    }

    if (action === 'input-change') {
      setInputValue(inputValue);
    }
  }

  const classNames = cn(styles.container, className, {
    [styles.invalid]: invalid
  });

  let componentProps = { ...props };

  // custom search input
  if (searchable) {
    componentProps = {
      ...componentProps,
      controlShouldRenderValue: true,
      inputValue: inputValue,
      onInputChange: handleInputChange
    };
  }

  if (menuPosition === 'fixed' && typeof document !== 'undefined') {
    componentProps = {
      ...componentProps,
      styles: {
        ...componentProps.styles,
        menuPortal: (base) => ({ ...base, zIndex: 9999 })
      },
      menuPortalTarget: document.body,
      menuPosition: 'fixed'
    };
  }

  const Element = async ? AsyncReactSelect : ReactSelect;

  return (
    <Element
      name={name}
      instanceId={name}
      options={options}
      value={value}
      classNamePrefix="select"
      async={async}
      isSearchable={searchable}
      isClearable={clearable}
      isLoading={loading}
      components={components}
      className={classNames}
      loadOptions={onOptionsRequest}
      onChange={handleSelect}
      {...componentProps}
    />
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ),
  components: PropTypes.object,
  icon: PropTypes.string,
  async: PropTypes.bool,
  searchable: PropTypes.bool,
  clearable: PropTypes.bool,
  invalid: PropTypes.bool,
  loading: PropTypes.bool,
  menuPosition: PropTypes.oneOf(['absolute', 'fixed']),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.func),
  onCheckEquality: PropTypes.func,
  onOptionsRequest: PropTypes.func,
  onChange: PropTypes.func
};

export default Select;
