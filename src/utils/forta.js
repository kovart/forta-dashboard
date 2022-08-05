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

  async getAlerts({ startDate, endDate, botIds = [], severities = [] }) {
    const query = `{
       alerts(input: $input) {
          pageInfo {
            hasNextPage
            endCursor {
              alertId
              blockNumber
            }
          }
          alerts {
            createdAt
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

    const variables = {
      input: {
        blockDateRange: {
          startDate: startDate,
          endDate: endDate
        },
        first: 20_000,
        severities: severities,
        bots: botIds
      }
    };

    let result = [];
    let pageInfo = null;
    while (!pageInfo || pageInfo.hasNextPage) {
      const response = await this.#request(query, {
        ...variables,
        after: pageInfo?.endCursor
      });
      result.push(...response.alerts);
      pageInfo = response.pageInfo;
    }

    return result;
  }

  async #request(queryString, variables) {
    const query = {
      query: queryString,
      variables: variables
    };

    const { data, errors } = await this.api.post(this.url, query);
    if (errors) return Promise.reject(errors);
    return data;
  }
}

const explorer = new FortaExplorer(FORTA_API_URL);

export default explorer;
