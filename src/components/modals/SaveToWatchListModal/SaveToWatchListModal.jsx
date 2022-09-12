import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Modal from '@components/shared/Modal/Modal';
import FormikField from '@components/shared/Formik/FormikField/FormikField';
import { GROUP_CATEGORY_OPTIONS } from '@constants/common';
import { handleGlobalError } from '@utils/error';
import db from '@utils/db';
import { FilterType } from '@constants/types';

function SaveToWatchListModal({
  open = false,
  filter,
  totalAlerts,
  className,
  onClose
}) {
  const { initialValues, validationSchema } = useMemo(
    () => ({
      initialValues: {
        title: '',
        description: '',
        category: null
      },
      validationSchema: Yup.object({
        title: Yup.string().max(120).required(),
        description: Yup.string().max(256).required(),
        category: Yup.string().nullable().required()
      })
    }),
    []
  );

  async function handleSubmit(values) {
    try {
      await db.watchGroups.add({
        ...values,
        totalAlerts,
        filter
      });
      toast(`Group "${values.title}" was saved`, { type: 'success' });
      onClose();
    } catch (e) {
      handleGlobalError(e);
    }
  }

  return (
    <Modal
      closable
      open={open}
      size="md"
      onClose={onClose}
      className={className}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <Modal.Header title="Save to Watch List" onClose={onClose} />
            <Modal.Body>
              <FormikField
                type="text"
                name="title"
                label="Title"
                placeholder="Enter title"
              />
              <FormikField
                type="textarea"
                name="description"
                label="Description"
                placeholder="Enter your description"
              />
              <FormikField
                type="select"
                name="category"
                label="Category"
                options={GROUP_CATEGORY_OPTIONS}
                placeholder="Select category"
                menuPosition="fixed"
              />
            </Modal.Body>
            <Modal.Controls
              actions={[
                {
                  label: 'Save',
                  type: 'submit',
                  primary: true,
                  loading: isSubmitting,
                  disabled: isSubmitting || !isValid
                },
                {
                  label: 'Cancel',
                  onClick: onClose
                }
              ]}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

SaveToWatchListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  filter: FilterType.isRequired,
  totalAlerts: PropTypes.shape({
    value: PropTypes.number,
    relation: PropTypes.string
  }),
  className: PropTypes.string,
  onClose: PropTypes.func
};

export default SaveToWatchListModal;
