import axios from 'axios';
import dayjs from 'dayjs';
import { queue } from 'async';
import { chunk } from 'lodash';

import { FORTA_API_URL, SYSTEM_DATE_FORMAT } from '@constants/common';
import { delay } from '@utils/helpers';
import logger from '@utils/logger';

const PARALLEL_REQUESTS = 40;
const DEFAULT_CHUCK_SIZE = 5000;
const RETRY_ATTEMPTS = 3;
const RETRY_WAIT = 10 * 1000; // 10s

export class FortaExplorer {
  constructor(url) {
    this.url = url;
    this.api = axios.create({
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  static shortAlertQuery = `query fetchAlerts($input: AlertsInput) {
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
            addresses
          }
        }
      }`;

  static metaAlertQuery = `query fetchAlerts($input: AlertsInput) {
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
            metadata
          }
        }
      }`;

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

  static botQuery = `query fetchBots($input: BotsInput) {
      bots(input: $input) {
        bots {
          id
          name
          description
          repository
          chainIds
          version
        }
        pageInfo {
          endCursor {
            createdAt
          }
          hasNextPage
        }
      }
    }`;

  async getBots({ ids, name, first = 20, endCursor }) {
    const query = FortaExplorer.botQuery;
    const input = {
      ids,
      name
    };

    return this.request('bots', query, {
      input: {
        ...input,
        first: first,
        after: endCursor
      }
    });
  }

  async getAlerts({
    chainId,
    startDate,
    endDate,
    botIds = [],
    alertIds = [],
    addresses = [],
    projectIds = [],
    severities = [],
    first = DEFAULT_CHUCK_SIZE,
    query = FortaExplorer.detailedAlertQuery,
    endCursor
  }) {
    const input = this.prepareAlertInput({
      chainId,
      startDate,
      endDate,
      botIds,
      projectIds,
      addresses,
      alertIds,
      severities
    });

    return this.request('alerts', query, {
      input: {
        ...input,
        first: first,
        after: endCursor
      }
    });
  }

  async getAllAlerts({
    chainId,
    startDate,
    endDate,
    addresses,
    severities,
    projectIds,
    botIds = [],
    alertIds = [],
    query = FortaExplorer.detailedAlertQuery,
    limit = Infinity,
    endCursor,
    onPageLoaded
  }) {
    const input = this.prepareAlertInput({
      chainId,
      startDate,
      endDate,
      botIds,
      projectIds,
      addresses,
      alertIds,
      severities
    });

    const items = new Set();

    const requestQueue = queue(async ({ alertId, botIds }, callback) => {
      let pageInfo = null;
      while ((!pageInfo || pageInfo.hasNextPage) && items.size < limit) {
        const response = await this.request('alerts', query, {
          input: {
            ...input,
            alertId,
            bots: botIds,
            first: Math.min(DEFAULT_CHUCK_SIZE, limit),
            after: pageInfo?.endCursor || endCursor
          }
        });
        const pageItems = this.prepareAlertsResponse(response);
        pageItems.forEach((item) => items.add(item));
        pageInfo = response.pageInfo;
        if (onPageLoaded) {
          onPageLoaded(pageItems, items, pageInfo);
        }
      }
      callback();
    }, PARALLEL_REQUESTS);

    // the explorer has limit to ~20 bots per request
    const chunks = chunk(botIds, 20);
    for (const chunk of chunks) {
      if (alertIds.length > 0) {
        requestQueue.push(
          alertIds.map((alertId) => ({
            alertId,
            botIds: chunk
          }))
        );
      } else {
        requestQueue.push({
          alertId: null,
          botIds: chunk
        });
      }
    }

    await requestQueue.drain();

    return items;
  }

  prepareAlertInput({
    startDate,
    endDate,
    chainId,
    botIds = [],
    alertIds = [],
    severities = [],
    addresses = [],
    projectIds = []
  }) {
    const input = {
      severities: severities,
      chainId: chainId,
      addresses: addresses,
      blockSortDirection: 'desc'
    };

    if (startDate || endDate) {
      input.blockDateRange = {};
      input.blockDateRange.startDate =
        startDate || dayjs().subtract(1, 'year').format(SYSTEM_DATE_FORMAT);
      input.blockDateRange.endDate =
        endDate || dayjs().format(SYSTEM_DATE_FORMAT);
    }

    // TODO the explorer doesn't support multiple projects at this time
    if (projectIds.length > 0) {
      input.projectId = projectIds[0];
    }

    // TODO the explorer doesn't support multiple alerts at this time
    if (alertIds.length > 0) {
      input.alertId = alertIds[0];
    }

    // TODO normalize naming
    if (botIds.length > 0) {
      input.bots = botIds;
    }

    return input;
  }

  prepareAlertsResponse(response) {
    return response.alerts.map((a) => ({
      ...a,
      // normalize addresses
      addresses: new Set(
        (a.addresses || []).map((a) => {
          if (a.slice(0, 2) !== '0x') {
            a = '0x' + a;
          }
          return a.toLowerCase();
        })
      )
    }));
  }

  async request(key, queryString, variables) {
    const query = {
      query: queryString,
      variables: variables
    };

    // remove fields with null and undefined values
    Object.keys(variables.input).forEach((key) => {
      if (variables.input[key] == null) delete variables.input[key];
    });

    let attemptCounter = 0;
    let chunkSize = variables.input.first;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const response = await this.api.post(this.url, query);
        const { errors } = response.data.data;
        const data = response.data.data[key];

        if (!errors) {
          return data;
        }
      } catch (e) {
        logger.error('attempt #' + (attemptCounter + 1), e);
        attemptCounter++;
        if (attemptCounter > RETRY_ATTEMPTS) {
          return Promise.reject(e);
        } else {
          chunkSize = Math.max(200, Math.floor(chunkSize / 1.5));
          logger.warn('Reducing size of chunk to', chunkSize);
          await delay(RETRY_WAIT);
        }
      }
    }
  }
}

const forta = new FortaExplorer(FORTA_API_URL);

export default forta;
