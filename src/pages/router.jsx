import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UiKitPage from '@pages/ui-kit';
import routes from '@constants/routes';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.index} element={<UiKitPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
