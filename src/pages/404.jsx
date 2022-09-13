import React from 'react';

import BaseLayout from '@components/layouts/BaseLayout/BaseLayout';
import { CSS_COLOR } from '@utils/css';

function Page404() {
  return (
    <BaseLayout>
      <h1
        style={{
          color: CSS_COLOR.neutral50,
          textAlign: 'center',
          marginTop: 140,
          fontSize: 50
        }}
      >
        404 Not found
      </h1>
    </BaseLayout>
  );
}

export default Page404;
