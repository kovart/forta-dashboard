import React from 'react';
import PropTypes from 'prop-types';

const BaseLayout = ({ children }) => (
  <>
    <main>{children}</main>
  </>
);

BaseLayout.propTypes = {
  children: PropTypes.any
};

export default BaseLayout;
