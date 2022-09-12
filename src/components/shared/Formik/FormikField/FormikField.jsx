import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import FormField from '@components/shared/Form/Field/Field';
import {
  getFieldComponent,
  getFieldHandlers
} from '@components/shared/Formik/FormikField/FormikField.utils';
import { FieldTypes } from '@components/shared/Form/Field/Field.utils';

function FormikField({ type, label, optional, className, ...componentProps }) {
  const { name } = componentProps;
  const formikContext = useFormikContext();
  // We don't use useField due to race issues
  const meta = formikContext.getFieldMeta(name);
  const formikFieldProps = formikContext.getFieldProps(name);

  const error =
    (meta.error && meta.touched) || formikContext.submitCount > 0
      ? meta.error
      : null;

  const Element = getFieldComponent(type);
  const handlers = getFieldHandlers({
    type,
    formikFieldProps,
    formikContext
  });

  let extraProps = {};

  if (type === FieldTypes.CHECKBOX) {
    extraProps = Object.assign({}, extraProps, {
      checked: formikContext.values[name]
    });
  }

  return (
    <FormField
      type={type}
      optional={optional}
      error={error}
      className={className}
      label={label}
      {...componentProps}
    >
      {(formFieldProps) => (
        <Element
          type={type}
          {...componentProps}
          {...formFieldProps}
          {...formikFieldProps}
          {...handlers}
          {...extraProps}
        />
      )}
    </FormField>
  );
}

FormikField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.any,
  type: PropTypes.oneOf(Object.values(FieldTypes)).isRequired,
  optional: PropTypes.bool,
  className: PropTypes.string
};

export default FormikField;
