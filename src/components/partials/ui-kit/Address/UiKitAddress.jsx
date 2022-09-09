import React from 'react';

import UiKitSection from '@components/partials/ui-kit/Section/UiKitSection';
import Address from '@components/shared/Address/Address';
import { CHAIN } from '@constants/common';

function UiKitAddress() {
  return (
    <UiKitSection title="Address" direction="row">
      <Address
        chainId={CHAIN.mainnet}
        address="0xeb467f831233c47b25877eaf895773c6031d7e71"
        checked={false}
      />
      <Address
        chainId={CHAIN.mainnet}
        address="0xeb467f831233c47b25877eaf895773c6031d7e71"
        checked={true}
      />
      <Address
        chainId={CHAIN.mainnet}
        address="0xeb467f831233c47b25877eaf895773c6031d7e71"
        checked={true}
        disabled={true}
      />
    </UiKitSection>
  );
}

export default UiKitAddress;
