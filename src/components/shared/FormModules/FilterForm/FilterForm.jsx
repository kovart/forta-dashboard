import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dayjs from 'dayjs';

import styles from './FilterForm.module.scss';

import { AppContext } from '@components/providers/AppContext/AppContext';
import Address from '@components/shared/Address/Address';
import Menu from '@components/shared/Menu/Menu';
import Period from '@components/shared/Form/Period/Period';
import Button from '@components/shared/Button/Button';
import Chip from '@components/shared/Chip/Chip';
import { CSS_COLOR } from '@utils/css';
import { IconSymbols } from '@components/shared/Icon/Icon';
import {
  APP_DATE_FORMAT,
  CHAIN,
  CHAIN_NAMES,
  SYSTEM_DATE_FORMAT
} from '@constants/common';
import { POPOVER_PLACEMENT } from '@components/shared/Popover/Popover';
import { FilterLockType, FilterType } from '@constants/types';

function FilterForm({ values, locked = {}, onSubmit, className }) {
  const { data } = useContext(AppContext);
  const { chainId, addresses = [], startDate, endDate, stagePreset } = values;
  const { addresses: lockedAddresses = [] } = locked;
  const {
    stagePresets: { forta: fortaStagePresets }
  } = data;
  const isEditable = typeof onSubmit === 'function';

  function handleChange(patchObj) {
    onSubmit({ ...values, ...patchObj });
  }

  const periodFormattedValue = useMemo(() => {
    const formatDate = (v) =>
      dayjs(v, SYSTEM_DATE_FORMAT).format(APP_DATE_FORMAT);

    if (startDate && !endDate) return 'From ' + formatDate(startDate);
    if (!startDate && endDate) return 'To ' + formatDate(endDate);
    if (startDate && endDate && startDate === endDate)
      return formatDate(endDate);
    if (startDate && endDate)
      return formatDate(startDate) + ' - ' + formatDate(endDate);

    return 'Period';
  }, [values.startDate, values.endDate]);

  return (
    <form className={cn(styles.root, className)}>
      <div className={styles.chips}>
        <Menu
          preferredWidth={150}
          placement={POPOVER_PLACEMENT.bottomStart}
          renderElement={({ ref, toggle }) => (
            <Chip
              ref={ref}
              icon={{ symbol: IconSymbols.Zap, color: CSS_COLOR.accentYellow }}
              onClick={isEditable && toggle}
            >
              {CHAIN_NAMES[chainId]}
            </Chip>
          )}
        >
          {Object.values(CHAIN).map((chainId) => (
            <Menu.Item
              key={chainId}
              selected={values.chainId === chainId}
              onClick={() => handleChange({ chainId })}
            >
              {CHAIN_NAMES[chainId]}
            </Menu.Item>
          ))}
        </Menu>
        <Period
          value={[startDate, endDate]}
          maxDate={dayjs().format(SYSTEM_DATE_FORMAT)}
          renderElement={({ ref, toggle }) => (
            <Chip
              ref={ref}
              empty={!startDate && !endDate}
              removable={startDate || endDate}
              icon={{
                symbol: IconSymbols.Calendar,
                color: CSS_COLOR.accentBlue2
              }}
              onClick={toggle}
              onRemove={() =>
                handleChange({
                  startDate: null,
                  endDate: null
                })
              }
            >
              {periodFormattedValue}
            </Chip>
          )}
          onChange={(e) =>
            handleChange({
              startDate: e.target.value[0],
              endDate: e.target.value[1]
            })
          }
        />
        <Menu
          placement={POPOVER_PLACEMENT.bottomStart}
          renderElement={({ ref, toggle }) => (
            <Chip
              ref={ref}
              empty={!stagePreset}
              removable={stagePreset}
              startIcon={{
                symbol: IconSymbols.Tool,
                color: CSS_COLOR.accentGreen
              }}
              endIcon={{ symbol: IconSymbols.ChevronDown }}
              onRemove={() => handleChange({ stagePreset: null })}
              onClick={isEditable && toggle}
            >
              {stagePreset ? stagePreset.label : 'Stages'}
            </Chip>
          )}
        >
          {fortaStagePresets.map((preset) => (
            <Menu.Item
              key={preset.label}
              selected={preset.value === stagePreset}
              onClick={() => handleChange({ stagePreset: preset })}
            >
              {preset.label}
            </Menu.Item>
          ))}
          <Menu.Separator />
          <Menu.Item
            icon={IconSymbols.Edit}
            onClick={() => alert('Not implemented yet')}
          >
            Create preset
          </Menu.Item>
        </Menu>
        <Button
          type="button"
          variant="secondary"
          startIcon={{
            symbol: IconSymbols.Star,
            color: CSS_COLOR.accentOrange
          }}
          endIcon={{ symbol: IconSymbols.ChevronDown }}
          className={styles.action}
        >
          Presets
        </Button>
        <Button
          type="button"
          variant="secondary"
          startIcon={{ symbol: IconSymbols.Plus, color: CSS_COLOR.neutral50 }}
          className={styles.action}
        >
          Add filter
        </Button>
      </div>
      {addresses.length > 0 && (
        <ul className={styles.addresses}>
          {addresses.map((address) => (
            <li key={address} className={styles.address}>
              <Address
                chainId={chainId}
                address={address}
                checked={true}
                disabled={!isEditable || lockedAddresses.includes(address)}
                onCheckedChange={() =>
                  handleChange({
                    addresses: addresses.filter((a) => a !== address)
                  })
                }
              />
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

FilterForm.propTypes = {
  values: FilterType.isRequired,
  locked: FilterLockType,
  onSubmit: PropTypes.func,
  className: PropTypes.string
};

export default FilterForm;
