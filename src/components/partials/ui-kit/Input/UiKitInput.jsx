import React from 'react';

import UiKitSection from '@components/partials/ui-kit/Section/UiKitSection';
import Input from '@components/shared/Form/Input/Input';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';

function UiKitInput() {
  return (
    <form action="/" onSubmit={(e) => e.preventDefault()} autoComplete="off">
      <UiKitSection title="Input" direction="row">
        <Input
          icon={{ left: IconSymbols.Search }}
          name="search1"
          placeholder="Search"
          variant="light"
        />
        <Input
          icon={{ left: IconSymbols.Search }}
          name="search2"
          placeholder="Search"
          variant="dark"
        />
        <Input
          type="password"
          name="password1"
          placeholder="Search"
          variant="dark"
        />
      </UiKitSection>
    </form>
  );
}

export default UiKitInput;
