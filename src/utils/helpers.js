import mergeWith from 'lodash/mergeWith';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';
import queryString from 'query-string';

import { HOMEPAGE } from '@constants/common';
import logger from '@utils/logger';

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function mergeStyles(style1, style2) {
  return mergeWith({}, style1, style2, (prop1, prop2) =>
    classNames(prop1, prop2)
  );
}

export function changeSearchParams(params = {}, options = {}) {
  const { replace = true } = options;

  const paramsEntries = Object.entries(params);
  const searchParams = new URLSearchParams();
  for (const [key, value] of paramsEntries) {
    searchParams.set(key, value);
  }

  const urlParts = [
    window.location.protocol + '//',
    window.location.host,
    window.location.pathname
  ];

  if (paramsEntries.length > 0) {
    urlParts.push(`?${searchParams.toString()}`);
  }

  const url = urlParts.join('');

  const method = replace
    ? window.history.replaceState.bind(window.history)
    : window.history.pushState.bind(window.history);

  method({ path: url }, '', url);
}

export function scrollToElement(id, yOffset = -24) {
  const element = document.getElementById(id);
  const top = Math.max(
    0,
    element.getBoundingClientRect().top + window.pageYOffset + yOffset
  );

  window.scrollTo({ top, behavior: 'smooth' });
}

export function simplifyAddress(value) {
  value = value.replace('0x', '');

  return '0x' + value.slice(0, 4) + '…' + value.slice(-6);
}

export function copyToClipboard(text, { showToast = true } = {}) {
  copy(text);
  if (showToast) {
    toast('Copied', { type: 'success' });
  }
}

export function stringifyQuery(obj) {
  return queryString.stringify(obj, { arrayFormat: 'bracket' });
}

export function getFullUrl(pathname, query) {
  const location = window.location;
  const isFileSystemLocation = location.protocol === 'file:';
  const queryString = stringifyQuery(query);

  return (
    (isFileSystemLocation ? location.origin + location.pathname : HOMEPAGE) +
    '#' +
    pathname +
    '?' +
    queryString
  );
}

export async function retry(fn, opts = {}) {
  const { attempts = 5, wait = 60 * 1000 } = opts;
  let attempt = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await fn();
    } catch (e) {
      logger.error('attempt #' + attempt, e);
      if (attempt > attempts) {
        return e;
      }
      attempt++;
      await delay(wait);
    }
  }
}
