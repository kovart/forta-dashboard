import React from 'react';

import UiKitMark from '@components/partials/ui-kit/Mark/UiKitMark';
import UiKitButton from '@components/partials/ui-kit/Button/UiKitButton';
import UiKitInput from '@components/partials/ui-kit/Input/UiKitInput';
import UiKitSelect from '@components/partials/ui-kit/Select/UiKitSelect';
import UiKitAddress from '@components/partials/ui-kit/Address/UiKitAddress';
import UiKitChip from '@components/partials/ui-kit/Chip/UiKitChip';
import UiKitSwitcher from '@components/partials/ui-kit/Switcher/UiKitSwitcher';
import UiKitMenu from '@components/partials/ui-kit/Menu/UiKitMenu';
import UiKitModal from '@components/partials/ui-kit/Modal/UiKitModal';

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
    </div>
  );
}

export default UiKitPage;
