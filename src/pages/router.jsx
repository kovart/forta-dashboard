import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UiKitPage from '@pages/ui-kit';
import ExplorerPage from '@pages/explorer';
import routes from '@constants/routes';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.index} element={<ExplorerPage />} />
      <Route path={routes.uiKit} element={<UiKitPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
