import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/css/OverlayScrollbars.css';

function Scrollbar({ children, className }) {
  const scrollbarRef = useRef();

  // fix height after fonts have been applied to the page
  useEffect(() => {
    document.fonts.ready.then(() => {
      const instance = scrollbarRef.current.osInstance();
      instance.options({ autoUpdate: false });
    });
  }, []);

  return (
    <OverlayScrollbarsComponent
      ref={scrollbarRef}
      options={{
        autoUpdate: true,
        className: cn(className, 'os-theme-dark'),
        scrollbars: { autoHide: 'scroll' }
      }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default Scrollbar;
