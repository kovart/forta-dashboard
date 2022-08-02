import React from 'react';

import BaseLayout from '@components/layouts/BaseLayout/BaseLayout';
import Loader from '@components/shared/Loader/Loader';

const DashboardPage = () => (
  <BaseLayout>
    <Loader variant="asterisk" bg="fill" position="fixed" />
  </BaseLayout>
);

export default DashboardPage;
