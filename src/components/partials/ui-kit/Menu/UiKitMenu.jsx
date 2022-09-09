import React from 'react';

import UiKitSection from '@components/partials/ui-kit/Section/UiKitSection';
import Menu from '@components/shared/Menu/Menu';
import Button from '@components/shared/Button/Button';
import { IconSymbols } from '@components/shared/Icon/Icon';
import { POPOVER_PLACEMENT } from '@components/shared/Popover/Popover';

function UiKitMenu() {
  return (
    <UiKitSection title="Menu">
      <Menu
        preferredWidth={200}
        placement={POPOVER_PLACEMENT.bottomStart}
        renderElement={({ ref, toggle }) => (
          <Button
            ref={ref}
            variant="secondary"
            endIcon={IconSymbols.ChevronDown}
            onClick={toggle}
          >
            Simple menu
          </Button>
        )}
      >
        <Menu.Item>Preset 1</Menu.Item>
        <Menu.Item>Preset 2</Menu.Item>
        <Menu.Item>Preset 3</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Custom preset</Menu.Item>
        <Menu.Separator />
        <Menu.Item icon={IconSymbols.Save}>Save preset</Menu.Item>
      </Menu>
      <Menu
        preferredWidth={200}
        placement={POPOVER_PLACEMENT.bottomStart}
        renderElement={({ ref, toggle }) => (
          <Button
            ref={ref}
            variant="secondary"
            endIcon={IconSymbols.ChevronDown}
            onClick={toggle}
          >
            Long menu
          </Button>
        )}
      >
        {Array(50)
          .fill(null)
          .map((_, i) => (
            <Menu.Item key={i}>Preset {i + 1}</Menu.Item>
          ))}
      </Menu>
    </UiKitSection>
  );
}

export default UiKitMenu;
