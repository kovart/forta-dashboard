import { useMemo } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

import { CssBreakpoints, getBreakpoint } from '@utils/css';

function useViewPort() {
  const windowWidth = useWindowWidth();

  function getState(windowWidth) {
    return {
      width: windowWidth,
      isMobile: windowWidth < CssBreakpoints.mdStart(),
      isTabletUp: windowWidth >= CssBreakpoints.mdStart(),
      isDesktopUp: windowWidth >= CssBreakpoints.xlStart(),
      breakpoint: getBreakpoint(windowWidth)
    };
  }

  return useMemo(() => getState(windowWidth), [windowWidth]);
}

export default useViewPort;
