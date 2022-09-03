import axios from 'axios';
import dayjs from 'dayjs';

import { FORTA_API_URL, SYSTEM_DATE_FORMAT } from '@constants/common';

export class FortaExplorer {
  constructor(url) {
    this.url = url;
    this.api = axios.create({
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  static detailedAlertQuery = `query fetchAlerts($input: AlertsInput) {
       alerts(input: $input) {
          pageInfo {
            hasNextPage
            endCursor {
              alertId
              blockNumber
            },
            totalAlerts {
              value
              relation
            }
          }
          alerts {
            alertId
            createdAt
            hash
            name
            protocol
            findingType
            source {
              transactionHash
              block {
                number
                chainId
              }
              bot {
                id
              }
            }
            severity
            metadata
            description
            addresses
            projects {
              name
              id
            }
          }
        }
      }`;

  async getData({
    chainId,
    startDate,
    endDate,
    botIds = [],
    alertIds = [],
    addresses = [],
    projectIds = [],
    severities = [],
    limit = 500,
    endCursor
  }) {
    const query = FortaExplorer.detailedAlertQuery;
    const input = this.prepareInput({
      chainId,
      startDate,
      endDate,
      botIds,
      projectIds,
      addresses,
      alertIds,
      severities
    });

    return this.request(query, {
      input: {
        ...input,
        first: Math.min(500, limit),
        blockSortDirection: 'desc',
        after: endCursor
      }
    });
  }

  async getAllAlerts({
    chainId,
    startDate,
    endDate,
    botIds,
    alertIds,
    addresses,
    projectIds,
    severities,
    limit = Infinity,
    endCursor
  }) {
    const query = FortaExplorer.detailedAlertQuery;
    const input = this.prepareInput({
      chainId,
      startDate,
      endDate,
      botIds,
      projectIds,
      addresses,
      alertIds,
      severities
    });

    let items = [];
    let pageInfo = null;
    while ((!pageInfo || pageInfo.hasNextPage) && items.length < limit) {
      const response = await this.request(query, {
        input: {
          ...input,
          first: Math.min(500, limit),
          after: pageInfo?.endCursor || endCursor
        }
      });
      items.push(...this.prepareData(response));
      pageInfo = response.pageInfo;
    }

    return items;
  }

  prepareInput({
    startDate,
    endDate,
    chainId,
    alertIds = {
      include: [],
      exclude: []
    },
    botIds = {
      include: [],
      exclude: []
    },
    severities = [],
    addresses = [],
    projectIds = []
  }) {
    const input = {
      severities: severities,
      chainId: chainId,
      addresses: addresses
    };

    // TODO the explorer doesn't support multiple projects at this time
    if (projectIds.length > 0) {
      input.projectId = projectIds[0];
    }

    // TODO the explorer doesn't support multiple alerts at this time
    if (alertIds.length > 0) {
      input.alertId = alertIds[0];
    }

    if (startDate || endDate) {
      input.blockDateRange = {};
      if (startDate) input.blockDateRange.startDate = startDate;
      input.blockDateRange.endDate =
        endDate || dayjs().format(SYSTEM_DATE_FORMAT);
    }

    // TODO the explorer doesn't support muted alerts/bots
    if (botIds.length > 0) {
      input.bots = botIds.include;
    }

    return input;
  }

  prepareData(response) {
    return response.alerts.map((a) => ({
      ...a,
      // normalize addresses
      addresses: (a.addresses || []).map((a) => {
        if (a.slice(0, 2) !== '0x') {
          a = '0x' + a;
        }
        return a.toLowerCase();
      })
    }));
  }

  async request(queryString, variables) {
    const query = {
      query: queryString,
      variables: variables
    };

    const response = await this.api.post(this.url, query);
    const { alerts, errors } = response.data.data;
    if (errors) return Promise.reject(errors);
    return alerts;
  }
}

const explorer = new FortaExplorer(FORTA_API_URL);

export default explorer;
