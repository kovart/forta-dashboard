import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@components/shared/Menu/Menu';
import Chip from '@components/shared/Chip/Chip';
import { POPOVER_PLACEMENT } from '@components/shared/Popover/Popover.utils';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';
import { CSS_COLOR } from '@utils/css';
import { CHAIN, CHAIN_NAMES } from '@constants/common';

function ChainChip({ editable, value, className, onChange }) {
  return (
    <Menu
      preferredWidth={125}
      placement={POPOVER_PLACEMENT.bottomStart}
      renderElement={({ ref, toggle }) => (
        <Chip
          ref={ref}
          clickable={editable}
          startIcon={{
            symbol: IconSymbols.Zap,
            color: CSS_COLOR.accentYellow
          }}
          endIcon={{ symbol: IconSymbols.ChevronDown }}
          onClick={toggle}
          className={className}
        >
          {CHAIN_NAMES[value]}
        </Chip>
      )}
    >
      {Object.values(CHAIN).map((chainId) => (
        <Menu.Item
          key={chainId}
          selected={value === chainId}
          onClick={() => onChange(chainId)}
        >
          {CHAIN_NAMES[chainId]}
        </Menu.Item>
      ))}
    </Menu>
  );
}

ChainChip.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.oneOf(Object.values(CHAIN)),
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default ChainChip;
