import React from 'react';

import styles from './UiKitSelect.module.scss';

import UiKitSection from '@components/partials/ui-kit/Section/UiKitSection';
import Select from '@components/shared/Form/Select/Select';

function UiKitSelect() {
  return (
    <UiKitSection title="Select" direction="row">
      <Select name="select1" placeholder="Empty" className={styles.item} />
      <Select
        clearable
        name="select2"
        placeholder="Select options"
        options={[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 }
        ]}
        className={styles.item}
      />
    </UiKitSection>
  );
}

export default UiKitSelect;
