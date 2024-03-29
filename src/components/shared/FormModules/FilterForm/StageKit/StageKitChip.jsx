import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Menu from '@components/shared/Menu/Menu';
import Chip from '@components/shared/Chip/Chip';
import useStageKit from '@hooks/useStageKit';
import { POPOVER_PLACEMENT } from '@components/shared/Popover/Popover.utils';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';
import { CSS_COLOR } from '@utils/css';
import { AppContext } from '@components/providers/AppContext/AppContext';

function StageKitChip({
  editable,
  removable,
  value: stageKitKey,
  className,
  onChange
}) {
  const {
    data: {
      stageKits: { forta: fortaStageKits }
    }
  } = useContext(AppContext);

  const stageKit = useStageKit(stageKitKey);

  return (
    <Menu
      placement={POPOVER_PLACEMENT.bottomStart}
      renderElement={({ ref, toggle }) => (
        <Chip
          ref={ref}
          empty={!stageKitKey}
          removable={removable}
          clickable={editable}
          startIcon={{
            symbol: IconSymbols.Tool,
            color: CSS_COLOR.accentGreen
          }}
          endIcon={{ symbol: IconSymbols.ChevronDown }}
          onRemove={() => onChange(null)}
          onClick={toggle}
          className={className}
        >
          {stageKit ? stageKit.name : 'Stage Kits'}
        </Chip>
      )}
    >
      {fortaStageKits.map((kit) => (
        <Menu.Item
          key={kit.key}
          selected={kit.key === stageKitKey}
          onClick={() => onChange(kit.key)}
        >
          {kit.name}
        </Menu.Item>
      ))}
    </Menu>
  );
}

StageKitChip.propTypes = {
  value: PropTypes.string, // key
  editable: PropTypes.bool,
  removable: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default StageKitChip;
