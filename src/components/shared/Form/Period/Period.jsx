import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dayjs from 'dayjs';

import styles from './Period.module.scss';

import Popover, { POPOVER_PLACEMENT } from '@components/shared/Popover/Popover';
import Date, { DATE_PICKER_MODE } from '@components/shared/Form/Date/Date';
import Button from '@components/shared/Button/Button';
import { SYSTEM_DATE_FORMAT } from '@constants/common';

function Period({
  name,
  value,
  minDate,
  maxDate,
  renderElement,
  onChange,
  className
}) {
  const elementRef = useRef();
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useLayoutEffect(() => {
    setTempValue(value);
  }, [value]);

  function handleChange(value) {
    onChange({
      target: {
        name,
        value
      }
    });
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className={cn(styles.root, className)}>
      {renderElement({ ref: elementRef, toggle: () => setIsOpen((v) => !v) })}
      <Popover
        open={isOpen}
        anchorElRef={elementRef}
        containerElRef={containerRef}
        placement={POPOVER_PLACEMENT.bottomStart}
        className={styles.container}
        onClose={() => setIsOpen(false)}
        maxHeight={600}
      >
        <div className={styles.row}>
          <h4 className={styles.subtitle}>Presets</h4>
          <div className={styles.shortcuts}>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setTempValue([dayjs().format(SYSTEM_DATE_FORMAT), null])
              }
            >
              Today
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setTempValue([
                  dayjs().subtract(1, 'week').format(SYSTEM_DATE_FORMAT),
                  null
                ])
              }
            >
              From one week ago
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setTempValue([
                  dayjs().subtract(1, 'month').format(SYSTEM_DATE_FORMAT),
                  null
                ])
              }
            >
              From one month ago
            </Button>
          </div>
        </div>
        <div className={styles.row}>
          <h4 className={styles.subtitle}>
            Period{' '}
            {tempValue[0] && tempValue[1] && (
              <span className={styles.duration}>
                (
                {dayjs(tempValue[1], SYSTEM_DATE_FORMAT).diff(
                  dayjs(tempValue[0], SYSTEM_DATE_FORMAT),
                  'days'
                ) + 1}{' '}
                days)
              </span>
            )}
          </h4>
          <div className={styles.dates}>
            <Date
              inline
              resettable
              value={tempValue[0]}
              name="startDate"
              mode={DATE_PICKER_MODE.single}
              placeholder="Start Date"
              minDate={minDate}
              maxDate={
                tempValue[1] &&
                dayjs(tempValue[1], SYSTEM_DATE_FORMAT).isBefore(maxDate)
                  ? tempValue[1]
                  : maxDate
              }
              onChange={(e) => setTempValue((v) => [e.target.value, v[1]])}
            />
            <Date
              inline
              resettable
              value={tempValue[1]}
              name="endDate"
              mode={DATE_PICKER_MODE.single}
              placeholder="End Date"
              minDate={tempValue[0]}
              maxDate={maxDate}
              onChange={(e) => setTempValue((v) => [v[0], e.target.value])}
            />
          </div>
        </div>
        <div className={styles.controls}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setTempValue([null, null])}
          >
            Clear
          </Button>
          <Button
            type="button"
            variant="primary"
            className={styles.applyButton}
            onClick={() => handleChange(tempValue)}
          >
            Apply
          </Button>
        </div>
      </Popover>
    </div>
  );
}

Period.propTypes = {
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  renderElement: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Period;
