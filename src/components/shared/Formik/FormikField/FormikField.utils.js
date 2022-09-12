import Checkbox from '@components/shared/Form/Checkbox/Checkbox';
import Select from '@components/shared/Form/Select/Select';
import TextArea from '@components/shared/Form/TextArea/TextArea';
import DatePicker from '@components/shared/Form/Date/Date';
import Input from '@components/shared/Form/Input/Input';
import { FieldTypes } from '@components/shared/Form/Field/Field.utils';

export function getFieldComponent(type) {
  switch (type) {
    case FieldTypes.CHECKBOX:
      return Checkbox;
    case FieldTypes.SELECT:
      return Select;
    case FieldTypes.TEXTAREA:
      return TextArea;
    case FieldTypes.DATE:
      return DatePicker;
    default:
      return Input;
  }
}

const getBlurHandler = ({ type, formikFieldProps, formikContext }) => {
  const { name } = formikFieldProps;

  if (type === FieldTypes.DATE) {
    // fix focus of DatePicker causing double click needed
    return () => {
      setTimeout(() => {
        formikContext.setFieldTouched(name, true);
      }, 200);
    };
  } else {
    return null;
  }
};

const getChangeHandler = ({ type, formikFieldProps, formikContext }) => {
  const { name } = formikFieldProps;
  if (type === FieldTypes.SELECT) {
    return (e) => {
      formikContext.setFieldValue(name, e.target.value, false);
      // fix Formik race issue that causes wrong validation after onBlur
      setTimeout(() => {
        formikContext.validateField(formikFieldProps.name);
      }, 100);
    };
  } else {
    return null;
  }
};

export function getFieldHandlers(props) {
  const handlers = {
    onChange: getChangeHandler(props),
    onBlur: getBlurHandler(props)
  };

  Object.entries(handlers).forEach(([key, value]) => {
    if (!value) {
      delete handlers[key];
    }
  });

  return handlers;
}
