import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from '@constants/routes';
import DashboardPage from '@pages/dashboard';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.index} element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
