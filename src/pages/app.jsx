import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { setAppElement } from 'react-modal';
import { ToastContainer } from 'react-toastify';
import 'focus-visible';
import 'normalize.css';

import AppContextProvider from '@components/providers/AppContext/AppContext';
import AppRouter from '@pages/router';
import '@assets/styles/main.scss';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
setAppElement('#root');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  }
});

const App = () => (
  <AppContextProvider>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ToastContainer position="bottom-right" />{' '}
    </QueryClientProvider>
  </AppContextProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
