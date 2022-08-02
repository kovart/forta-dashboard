import mergeWith from 'lodash/mergeWith';
import classNames from 'classnames';

const Helpers = {
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  mergeStyles(style1, style2) {
    return mergeWith({}, style1, style2, (prop1, prop2) =>
      classNames(prop1, prop2)
    );
  },
  changeSearchParams(params = {}, options = {}) {
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
  },
  scrollToElement(id, yOffset) {
    const element = document.getElementById(id);
    const top =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default Helpers;
