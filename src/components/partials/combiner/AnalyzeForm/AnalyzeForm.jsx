import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './AnalyzeForm.module.scss';

import ChainChip from '@components/shared/FormModules/FilterForm/Chain/ChainChip';
import PeriodChip from '@components/shared/FormModules/FilterForm/Period/PeriodChip';
import StageKitChip from '@components/shared/FormModules/FilterForm/StageKit/StageKitChip';
import Button from '@components/shared/Button/Button';
import { CSS_COLOR } from '@utils/css';

function AnalyzeForm({ values, submitting, className, onChange, onSubmit }) {
  function handleChange(patchObj) {
    onChange({ ...values, ...patchObj });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <div className={cn(styles.root, className)}>
      <h3 className={styles.title}>Search for attacks</h3>
      <p className={styles.description}>
        You are in{' '}
        <span style={{ color: CSS_COLOR.accentYellow }}>semi-automatic</span>{' '}
        attack search mode. <br />
        Please, select the network, the time period, and the set of bots to be
        analyzed.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ChainChip
          editable
          value={values.chainId}
          onChange={(chainId) => handleChange({ chainId })}
        />
        <PeriodChip
          editable
          value={[values.startDate, values.endDate]}
          onChange={(value) =>
            handleChange({ startDate: value[0], endDate: value[1] })
          }
        />
        <StageKitChip
          editable
          removable={false}
          value={values.stageKit}
          onChange={(stageKit) => handleChange({ stageKit })}
        />
        <Button
          type="submit"
          disabled={
            submitting ||
            !values.stageKit ||
            !(values.startDate || values.endDate)
          }
          loading={submitting}
          variant="primary"
          className={styles.submitButton}
        >
          Analyze
        </Button>
      </form>
    </div>
  );
}

AnalyzeForm.propTypes = {
  values: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    chainId: PropTypes.string,
    stageKit: PropTypes.string
  }),
  submitting: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default AnalyzeForm;
