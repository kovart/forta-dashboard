import React from 'react';

import UiKitMark from '@components/partials/ui-kit/Mark/Mark';
import UiKitButton from '@components/partials/ui-kit/Button/Button';
import UiKitInput from '@components/partials/ui-kit/Input/Input';
import UiKitSelect from '@components/partials/ui-kit/Select/Select';
import UiKitAddress from '@components/partials/ui-kit/Address/Address';
import UiKitChip from '@components/partials/ui-kit/Chip/Chip';
import UiKitSwitcher from '@components/partials/ui-kit/Switcher/Switcher';
import UiKitMenu from '@components/partials/ui-kit/Menu/Menu';
import UiKitModal from '@components/partials/ui-kit/Modal/Modal';
import UiKitAlertGroup from '@components/partials/ui-kit/AlertGroup/AlertGroup';
import UiKitFilterForm from '@components/partials/ui-kit/FilterForm/FilterForm';

function UiKitPage() {
  return (
    <div
      style={{ padding: 24, width: '100%', maxWidth: 1400, margin: '0 auto' }}
    >
      <UiKitMark />
      <UiKitButton />
      <UiKitInput />
      <UiKitSelect />
      <UiKitAddress />
      <UiKitChip />
      <UiKitSwitcher />
      <UiKitMenu />
      <UiKitModal />
      <UiKitAlertGroup />
      <UiKitFilterForm />
    </div>
  );
}

export default UiKitPage;
