import React, { useLayoutEffect, useRef, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';

import styles from './Date.module.scss';

import Input from '@components/shared/Form/Input/Input';
import Button from '@components/shared/Button/Button';
import InputButton from '@components/shared/Form/Input/Button/InputButton';
import { SYSTEM_DATE_FORMAT, APP_DATE_FORMAT } from '@constants/common';
import { IconSymbols } from '@components/shared/Icon/Icon';

const formatToShortDate = (val) =>
  dayjs(val, SYSTEM_DATE_FORMAT).format(APP_DATE_FORMAT);

export const DATE_PICKER_MODE = {
  single: 'single',
  range: 'range',
  multiple: 'multiple'
};

export const DATE_PICKER_FORMATTER = {
  [DATE_PICKER_MODE.single]: (value) => (value ? formatToShortDate(value) : ''),
  [DATE_PICKER_MODE.range]: (value) => {
    value = value || [];

    value = value.map(formatToShortDate);

    if (value[0] === value[1]) return value[0];

    return value.join(' - ');
  },
  [DATE_PICKER_MODE.multiple]: (value) =>
    (value || []).map(formatToShortDate).join(', '),
  rangeFromNow: (value) => {
    value = value || [];

    const nowDate = dayjs().format(SYSTEM_DATE_FORMAT);
    const endDate = value[1];

    if (endDate && nowDate === endDate) {
      const time = dayjs(value[0], SYSTEM_DATE_FORMAT).toNow(true);
      return 'Last ' + time.replace('a ', '');
    } else {
      return DATE_PICKER_FORMATTER[DATE_PICKER_MODE.range](value);
    }
  }
};

const prepareValue = (val) => (Array.isArray(val) && !val.length ? null : val);

const DatePicker = ({
  icon,
  name,
  value,
  minDate,
  maxDate,
  inline = false,
  mode = DATE_PICKER_MODE.single,
  showMonths = 1,
  resettable = true,
  onChange = () => {},
  onFormatValue = DATE_PICKER_FORMATTER[mode],
  className,
  ...props
}) => {
  icon =
    typeof icon === 'string' ? { left: icon } : { left: IconSymbols.Clock };

  const localValueRef = useRef(value);
  const [flatpickr, setFlatpickr] = useState(null);
  const components = { right: [] };

  const handleChange = (value, event) => {
    localValueRef.current = value;

    if (value) {
      if (mode === DATE_PICKER_MODE.single) {
        value = value ? dayjs(value[0]).format(SYSTEM_DATE_FORMAT) : null;
      } else {
        value = value.map((v) =>
          value ? dayjs(v).format(SYSTEM_DATE_FORMAT) : null
        );
      }
    }

    onChange({
      event,
      target: { name, value }
    });
  };

  function handleReset() {
    const value = mode !== DATE_PICKER_MODE.single ? [] : null;
    localValueRef.current = value;
    onChange({
      target: { name, value }
    });
  }

  const updateInput = () => {
    if (flatpickr) {
      // This also fixes issue that flatpickr doesn't update input
      // if current date <= minDate prop
      flatpickr.element.value = onFormatValue(value);
    }
  };

  useLayoutEffect(updateInput);

  if (
    resettable &&
    (mode !== DATE_PICKER_MODE.single && Array.isArray(value)
      ? value.length > 0
      : value)
  ) {
    components.right.push({
      render: function ClearButton() {
        return (
          <InputButton>
            <Button
              type="button"
              variant="icon-md"
              icon={IconSymbols.Cross}
              onClick={handleReset}
              className={styles.button}
            />
          </InputButton>
        );
      },
      width: 44
    });
  }

  return (
    <Flatpickr
      className={cn(styles.root, className)}
      value={prepareValue(value)}
      {...props}
      options={{
        mode,
        inline,
        dateFormat: 'Y/m/d',
        disableMobile: true,
        showMonths,
        minDate,
        maxDate
      }}
      onReady={(_, $, flatpickr) => setFlatpickr(flatpickr)}
      onChange={(value) => handleChange(value, 'change')}
      onClose={() => {
        // if only one date is picked in range mode and user closes the window,
        // Flatpickr resets its value but doesn't emit onChange event
        if (mode === DATE_PICKER_MODE.range) {
          let value = localValueRef.current;
          if (Array.isArray(value) && typeof value[0] === 'string') {
            // Flatpickr emits Date object on 'change' event
            value = value.map((v) => dayjs(v, SYSTEM_DATE_FORMAT).toDate());
          }
          handleChange(value, 'close');
        }
      }}
      onDestroy={() => setFlatpickr(null)}
      render={({ ...props }, ref) => (
        <Input
          name={name}
          ref={ref}
          type="text"
          variant="dark"
          components={components}
          icon={icon}
          onChange={() => {}}
          {...props}
          value=""
        />
      )}
    />
  );
};

DatePicker.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  mode: PropTypes.oneOf(Object.values(DATE_PICKER_MODE)),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  showMonths: PropTypes.number,
  placeholder: PropTypes.string,
  resettable: PropTypes.bool,
  onFormatValue: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  className: PropTypes.string
};

export default DatePicker;
