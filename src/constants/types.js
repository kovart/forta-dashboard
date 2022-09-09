import PropTypes from 'prop-types';

import { SEVERITY } from '@constants/common';
import { STAGE_COLOR } from '@constants/stages';

export const AlertType = PropTypes.shape({
  alertId: PropTypes.string,
  createdAt: PropTypes.string,
  name: PropTypes.string,
  protocol: PropTypes.string,
  findingType: PropTypes.string,
  source: PropTypes.shape({
    transactionHash: PropTypes.string,
    block: PropTypes.shape({
      number: PropTypes.number,
      chainId: PropTypes.number
    }),
    bot: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  severity: PropTypes.oneOf(Object.values(SEVERITY)),
  metadata: PropTypes.object,
  description: PropTypes.string,
  addresses: PropTypes.object, // Set
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
});

export const StageType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.values(STAGE_COLOR)),
  alertIds: PropTypes.arrayOf(PropTypes.string)
});

export const FilterType = PropTypes.shape({
  chainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  addresses: PropTypes.arrayOf(PropTypes.string),
  projectIds: PropTypes.arrayOf(PropTypes.string),
  alertIds: PropTypes.arrayOf(PropTypes.string),
  botIds: PropTypes.arrayOf(PropTypes.string),
  severities: PropTypes.arrayOf(PropTypes.oneOf(Object.values(SEVERITY))),
  stageKit: PropTypes.string
});

export const FilterLockType = PropTypes.shape({
  addresses: PropTypes.arrayOf(PropTypes.string)
});

export const FilterPermanentElementsType = PropTypes.shape({
  chain: PropTypes.bool,
  period: PropTypes.bool,
  stageKit: PropTypes.bool
});
