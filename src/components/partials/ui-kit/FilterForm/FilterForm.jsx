import React, { useState } from 'react';

import UiKitSection from '@components/partials/ui-kit/Section/Section';
import FilterForm from '@components/shared/FormModules/FilterForm/FilterForm';
import { CHAIN } from '@constants/common';

const initialParameters = {
  chainId: CHAIN.avalanche,
  addresses: ['0x1041e66182c892d2ba9666f43c1c73c0ab8f5d09'],
  startDate: null,
  endDate: null,
  projects: [],
  severities: [],
  alertIds: {
    include: [],
    exclude: []
  },
  botIds: {
    include: [],
    exclude: []
  },
  stagePreset: null
};

function UiKitFilterForm() {
  const [values, setValues] = useState(initialParameters);

  return (
    <UiKitSection title="Filter Form" direction="column">
      <FilterForm values={values} editable={false} onChange={setValues} />
    </UiKitSection>
  );
}

export default UiKitFilterForm;
