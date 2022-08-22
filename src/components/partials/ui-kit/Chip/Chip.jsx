import React from 'react';

import UiKitSection from '@components/partials/ui-kit/Section/Section';
import Chip from '@components/shared/Chip/Chip';
import { IconSymbols } from '@components/shared/Icon/Icon';
import { CSS_COLOR } from '@utils/css';

function UiKitChip() {
  return (
    <UiKitSection title="Chips" direction="row">
      <Chip clickable removable onClick={() => {}} onRemove={() => {}}>
        <span style={{ color: CSS_COLOR.accentPink }}>Critical</span>
      </Chip>
      <Chip
        clickable
        icon={{ symbol: IconSymbols.Zap, color: CSS_COLOR.accentYellow }}
        onClick={() => {}}
      >
        Mainnet
      </Chip>
      <Chip
        clickable
        icon={{ symbol: IconSymbols.Calendar, color: CSS_COLOR.accentBlue2 }}
        onClick={() => {}}
      >
        15/12/2022 - now
      </Chip>
      <Chip
        clickable
        removable
        icon={{ symbol: IconSymbols.Box, color: CSS_COLOR.accentBlue1 }}
        onClick={() => {}}
        onRemove={() => {}}
      >
        2 projects
      </Chip>
    </UiKitSection>
  );
}

export default UiKitChip;
