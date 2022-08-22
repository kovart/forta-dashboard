import React from 'react';
import ReactDOM from 'react-dom/client';
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

const App = () => (
  <AppContextProvider>
    <AppRouter />
    <ToastContainer position="bottom-right" />
  </AppContextProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
