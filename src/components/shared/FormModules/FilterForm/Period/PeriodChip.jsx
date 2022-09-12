import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Period from '@components/shared/Form/Period/Period';
import Chip from '@components/shared/Chip/Chip';
import { APP_DATE_FORMAT, SYSTEM_DATE_FORMAT } from '@constants/common';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';
import { CSS_COLOR } from '@utils/css';

function PeriodChip({ value, editable = false, className, onChange }) {
  const [startDate, endDate] = value;

  const periodFormattedValue = useMemo(() => {
    const formatDate = (v) =>
      dayjs(v, SYSTEM_DATE_FORMAT).format(APP_DATE_FORMAT);

    if (startDate && !endDate) return formatDate(startDate) + ' - now';
    if (!startDate && endDate) return 'To ' + formatDate(endDate);
    if (startDate && endDate && startDate === endDate)
      return formatDate(endDate);
    if (startDate && endDate)
      return formatDate(startDate) + ' - ' + formatDate(endDate);

    return 'Period';
  }, [value]);

  return (
    <Period
      value={value}
      maxDate={dayjs().format(SYSTEM_DATE_FORMAT)}
      renderElement={({ ref, toggle }) => (
        <Chip
          ref={ref}
          empty={!startDate && !endDate}
          clickable={editable}
          removable={editable && !!(startDate || endDate)}
          icon={{
            symbol: IconSymbols.Calendar,
            color: CSS_COLOR.accentBlue2
          }}
          onClick={toggle}
          onRemove={() => onChange([null, null])}
          className={className}
        >
          {periodFormattedValue}
        </Chip>
      )}
      onChange={(e) => onChange([e.target.value[0], e.target.value[1]])}
    />
  );
}

PeriodChip.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default PeriodChip;
