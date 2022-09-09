import React, { useState } from 'react';

import UiKitSection from '@components/partials/ui-kit/Section/UiKitSection';
import Switcher from '@components/shared/Form/Switcher/Switcher';

function UiKitSwitcher() {
  const [value, setValue] = useState('1');
  return (
    <UiKitSection title="Switcher" direction="column">
      <Switcher
        name="switch1"
        value={value}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]}
        onChange={(e) => setValue(e.target.value)}
      />
    </UiKitSection>
  );
}

export default UiKitSwitcher;
