import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import Chip from '@components/shared/Chip/Chip';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';
import { CSS_COLOR } from '@utils/css';

function BotChip({
  editable,
  removable,
  value = [],
  className,
  onChange,
  onClick
}) {
  return (
    <Chip
      empty={!value}
      removable={removable}
      clickable={editable}
      startIcon={{
        symbol: IconSymbols.CPU,
        color: CSS_COLOR.accentGreen
      }}
      onRemove={() => onChange([])}
      onClick={onClick}
      className={className}
    >
      {pluralize('bot', value.length, true)}
    </Chip>
  );
}

BotChip.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  editable: PropTypes.bool,
  removable: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default BotChip;
