import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import FormMessage from '@components/shared/Form/Message/Message';

function FormikFormError({ fieldName = 'non_field_errors', ...props }) {
  const { errors } = useFormikContext();
  const text = errors[fieldName];

  if (!text) {
    return null;
  }

  return <FormMessage message={text} type="error" {...props} />;
}

FormikFormError.propTypes = {
  alignment: PropTypes.oneOf(['left', 'center']),
  fieldName: PropTypes.string,
  className: PropTypes.string
};

export default FormikFormError;
