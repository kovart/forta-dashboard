import React from 'react';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash';

import Chip from '@components/shared/Chip/Chip';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';
import { CSS_COLOR } from '@utils/css';
import { SEVERITY } from '@constants/common';

function SeverityChip({
  editable,
  removable,
  value,
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
        symbol: IconSymbols.Bell,
        color: CSS_COLOR.accentOrange
      }}
      onRemove={() => onChange([])}
      onClick={onClick}
      className={className}
    >
      {value.length <= 2
        ? value.map((v) => upperFirst(v.toLowerCase())).join(', ')
        : value.length + ' severities'}
    </Chip>
  );
}

SeverityChip.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOf(Object.values(SEVERITY))),
  editable: PropTypes.bool,
  removable: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default SeverityChip;
