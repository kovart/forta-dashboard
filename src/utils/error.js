import { toast } from 'react-toastify';
import axios from 'axios';

import Logger from '@utils/logger';

export const UNIVERSAL_ERROR_MESSAGE = 'Looks like something went wrong 😢';

export function prepareAxiosError(error) {
  let errors = {};

  if (error?.response?.data) {
    const { data } = error.response;

    if (typeof data === 'string') {
      errors = { non_field_errors: data };
    } else if (Array.isArray(data)) {
      errors = data;
    } else {
      Object.keys(data).forEach((key) => {
        errors[key] = data[key];
      });
    }
  }

  if (errors.detail) {
    errors.non_field_errors = errors.detail;
    delete errors.detail;
  }

  return errors;
}

export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    error = prepareAxiosError(error);
  }

  let message = error.non_field_errors || error.detail || error.message;

  if (!message) {
    if (Object.keys(error).length === 1) {
      message = Object.values(error)[0];
      if (Array.isArray(message)) {
        message = message.join('. ');
      }
    } else {
      message = UNIVERSAL_ERROR_MESSAGE;
    }
  }

  return message;
}

export function handleGlobalError(error, options) {
  Logger.error(error);

  if (options.toaster) {
    const message = getErrorMessage(error);
    toast(message, { type: 'error' });
  }
}