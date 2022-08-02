/* eslint-disable no-console */
import { IS_DEVELOPMENT } from '@constants/common';

const LoggerRaw = {
  log(...args) {
    console.log(...args);
  },
  info(...args) {
    console.info(...args);
  },
  warn(...args) {
    console.warn(...args);
  },
  error(...args) {
    console.error(...args);
  },
  debug(...args) {
    console.error(...args);
  }
};

const Logger = new Proxy(LoggerRaw, {
  get: function (target, name) {
    if (!IS_DEVELOPMENT) {
      return () => {};
    }
    return target[name];
  }
});

export default Logger;
