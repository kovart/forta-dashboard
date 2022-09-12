import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './FilterForm.module.scss';

import Address from '@components/shared/Address/Address';
import Button from '@components/shared/Button/Button';
import Menu from '@components/shared/Menu/Menu';
import AddressFilterModal from '@components/modals/filters/AddressFilter/AddressFilterModal';
import SeverityFilterModal from '@components/modals/filters/SeverityFilter/SeverityFilterModal';
import BotFilterModal from '@components/modals/filters/BotFilter/BotFilterModal';
import ChainChip from '@components/shared/FormModules/FilterForm/Chain/ChainChip';
import PeriodChip from '@components/shared/FormModules/FilterForm/Period/PeriodChip';
import StageKitChip from '@components/shared/FormModules/FilterForm/StageKit/StageKitChip';
import SeverityChip from '@components/shared/FormModules/FilterForm/Severity/SeverityChip';
import BotChip from '@components/shared/FormModules/FilterForm/Bot/BotChip';
import { CSS_COLOR } from '@utils/css';
import { IconSymbols } from '@components/shared/Icon/Icon';
import {
  FilterLockType,
  FilterPermanentElementsType,
  FilterType
} from '@constants/types';

const MODAL = {
  address: 'address',
  project: 'project',
  severity: 'severity',
  bot: 'bot'
};

// TODO Add project filter

function FilterForm({
  values,
  locked = {},
  permanent = {},
  editable = true,
  onChange,
  className
}) {
  const { addresses = [] } = values;
  const { addresses: lockedAddresses = [] } = locked;
  const [modals, setModals] = useState({});

  const openModal = (key) => setModals((v) => ({ ...v, [key]: true }));
  const closeModal = (key) => setModals((v) => ({ ...v, [key]: false }));

  const handleChange = (patchObj) => onChange({ ...values, ...patchObj });

  return (
    <form className={cn(styles.root, className)}>
      <div className={styles.chips}>
        {(permanent.chain || values.chainId) && (
          <ChainChip
            value={values.chainId}
            editable={editable}
            onChange={(chainId) => handleChange({ chainId })}
          />
        )}
        {(permanent.period || values.startDate || values.endDate) && (
          <PeriodChip
            editable={editable}
            value={[values.startDate, values.endDate]}
            onChange={(value) =>
              handleChange({ startDate: value[0], endDate: value[1] })
            }
          />
        )}
        {(permanent.stageKit || values.stageKit) && (
          <StageKitChip
            value={values.stageKit}
            editable={editable}
            removable={!!values.stageKit}
            onChange={(value) => handleChange({ stageKit: value })}
          />
        )}
        {(permanent.botIds || values.botIds?.length > 0) && (
          <BotChip
            removable
            editable
            value={values.botIds}
            onClick={() => openModal(MODAL.bot)}
            onChange={(botIds) => handleChange({ botIds })}
          />
        )}
        {(permanent.severities || values.severities?.length > 0) && (
          <SeverityChip
            removable
            editable
            value={values.severities}
            onClick={() => openModal(MODAL.severity)}
            onChange={(severities) => handleChange({ severities })}
          />
        )}
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
        <Menu
          preferredWidth={150}
          renderElement={({ ref, toggle }) => (
            <Button
              ref={ref}
              type="button"
              variant="secondary"
              startIcon={{
                symbol: IconSymbols.Plus,
                color: CSS_COLOR.neutral50
              }}
              className={styles.action}
              onClick={toggle}
            >
              Add filter
            </Button>
          )}
        >
          <Menu.Item
            icon={IconSymbols.CPU}
            onClick={() => openModal(MODAL.bot)}
          >
            Bot
          </Menu.Item>
          <Menu.Item
            icon={IconSymbols.Box}
            onClick={() => alert('Not implemented yet')}
          >
            Project
          </Menu.Item>
          <Menu.Item
            icon={IconSymbols.CreditCard}
            onClick={() => openModal(MODAL.address)}
          >
            Address
          </Menu.Item>
          <Menu.Item
            icon={IconSymbols.Bell}
            onClick={() => openModal(MODAL.severity)}
          >
            Severity
          </Menu.Item>
        </Menu>
      </div>
      {addresses.length > 0 && (
        <ul className={styles.addresses}>
          {addresses.map((address) => (
            <li key={address} className={styles.address}>
              <Address
                chainId={values.chainId}
                address={address}
                checked={true}
                clickable={editable && !lockedAddresses.includes(address)}
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
      <AddressFilterModal
        open={!!modals[MODAL.address]}
        addresses={values.addresses}
        onAddressesChange={(addresses) => handleChange({ addresses })}
        onClose={() => closeModal(MODAL.address)}
      />
      <SeverityFilterModal
        open={!!modals[MODAL.severity]}
        severities={values.severities || []}
        onClose={() => closeModal(MODAL.severity)}
        onSeveritiesChange={(severities) => handleChange({ severities })}
      />
      <BotFilterModal
        open={!!modals[MODAL.bot]}
        botIds={values.botIds}
        onClose={() => closeModal(MODAL.bot)}
        onBotIdsChange={(botIds) => handleChange({ botIds })}
      />
    </form>
  );
}

FilterForm.propTypes = {
  values: FilterType.isRequired,
  locked: FilterLockType,
  permanent: FilterPermanentElementsType,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default FilterForm;
