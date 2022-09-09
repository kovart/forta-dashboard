import React from 'react';

import UiKitSection from '@components/partials/ui-kit/Section/UiKitSection';
import Button from '@components/shared/Button/Button';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';

function UiKitButton() {
  return (
    <UiKitSection title="Button">
      <Button variant="primary" startIcon={IconSymbols.Zap}>
        Primary
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" disabled loading>
        Loading
      </Button>
      <Button variant="outline">Outline</Button>
      <Button variant="icon-base" icon={IconSymbols.Filter} />
      <Button variant="icon-md" icon={IconSymbols.Filter} />
    </UiKitSection>
  );
}

export default UiKitButton;
