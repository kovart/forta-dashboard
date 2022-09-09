import React from 'react';

import Mark from '@components/shared/Form/Mark/Mark';
import UiKitSection from '@components/partials/ui-kit/Section/UiKitSection';

function UiKitMark() {
  return (
    <UiKitSection title="Mark">
      <Mark variant="checkbox" checked={false} />
      <Mark variant="checkbox" checked={true} />
      <Mark variant="radio" checked={false} />
      <Mark variant="radio" checked={true} />
    </UiKitSection>
  );
}

export default UiKitMark;
