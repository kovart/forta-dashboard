import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import UiKitPage from '@pages/ui-kit';
import ExplorerPage from '@pages/explorer';
import CombinerPage from '@pages/combiner';
import WatchListPage from '@pages/watchlist';
import Page404 from '@pages/404';
import routes from '@constants/routes';

const AppRouter = () => (
  <HashRouter>
    <Routes>
      <Route path={routes.index} element={<ExplorerPage />} />
      <Route path={routes.combiner} element={<CombinerPage />} />
      <Route path={routes.watchlist} element={<WatchListPage />} />
      <Route path={routes.uiKit} element={<UiKitPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </HashRouter>
);

export default AppRouter;
