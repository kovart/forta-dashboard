import React, { useMemo } from 'react';
import { components } from 'react-select';

import styles from './Select.module.scss';

import Icon, { IconSymbols } from '@components/shared/Icon/Icon';

function getControlComponent(icon) {
  if (!icon) return null;

  // eslint-disable-next-line react/prop-types,react/display-name
  return ({ children, ...props }) => (
    <components.Control {...props}>
      <Icon symbol={icon} size={null} className={styles.icon} />
      {children}
    </components.Control>
  );
}

const DropdownIndicator = (props) => (
  <span className={styles.dropdownButton}>
    <components.DropdownIndicator {...props}>
      <Icon symbol={IconSymbols.ChevronDown} size={18} />
    </components.DropdownIndicator>
  </span>
);

const ClearIndicator = (props) => (
  <span className={styles.clearButton}>
    <components.ClearIndicator {...props}>
      <Icon symbol={IconSymbols.Cross} size={18} />
    </components.ClearIndicator>
  </span>
);

const Input = (props) => (
  <components.Input {...props} isHidden={false} maxLength={100} />
);

export function useSelectComponents({ icon, components }) {
  const Control = useMemo(() => getControlComponent(icon), [icon]);

  const selectComponents = {
    Input,
    ClearIndicator,
    DropdownIndicator,
    Control,
    ...components
  };

  for (const key in selectComponents) {
    if (!selectComponents[key]) {
      delete selectComponents[key];
    }
  }

  return selectComponents;
}
