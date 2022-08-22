import axios from 'axios';

import { FORTA_API_URL } from '@constants/common';

class FortaExplorer {
  constructor(url) {
    this.url = url;
    this.api = axios.create({
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  async getAlerts({
    startDate,
    endDate,
    chainId,
    botIds = [],
    severities = [],
    limit = Infinity
  }) {
    const query = `query fetchAlerts($input: AlertsInput) {
       alerts(input: $input) {
          pageInfo {
            hasNextPage
            endCursor {
              alertId
              blockNumber
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

    const input = {
      first: Math.min(1000, limit),
      severities: severities,
      bots: botIds,
      chainId: chainId
    };

    if (startDate || endDate) {
      input.blockDateRange = {};
      if (startDate) input.blockDateRange.startDate = startDate;
      if (endDate) input.blockDateRange.endDate = endDate;
    }

    let items = [];
    let pageInfo = null;
    while ((!pageInfo || pageInfo.hasNextPage) && items.length < limit) {
      const response = await this.#request(query, {
        input: {
          ...input,
          after: pageInfo?.endCursor
        }
      });
      items.push(...response.alerts);
      pageInfo = response.pageInfo;
    }

    // normalize addresses
    items.forEach(
      (item) =>
        (item.addresses = item.addresses?.map((a) => {
          if (a.slice(0, 2) !== '0x') {
            a = '0x' + a;
          }
          return a.toLowerCase();
        }))
    );

    return items;
  }

  async #request(queryString, variables) {
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
