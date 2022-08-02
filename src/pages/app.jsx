import React from 'react';
import ReactDOM from 'react-dom/client';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { setAppElement } from 'react-modal';
import { ToastContainer } from 'react-toastify';
import 'focus-visible';
import 'normalize.css';

import IconsImportUtil from '@utils/icons';
import AppRouter from '@pages/router';
import '@assets/styles/main.scss';

IconsImportUtil.import(require.context('@assets/icons/', true, /\.svg$/));

dayjs.extend(duration);
setAppElement('#root');

const App = () => (
  <>
    <AppRouter />
    <ToastContainer position="bottom-right" />
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
