import { SEVERITY } from '@constants/common';

export const mockAlert1 = {
  createdAt: '2022-08-21T21:48:19.444701411Z',
  name: 'Large flash loan',
  description:
    'A flash loan to 0x772740118a4fF24ad7b0E586ef13798Bd7D2b349 of 500 jEUR, was detected. The amount made up 64.698% of the TVL.',
  protocol: 'Balancer',
  findingType: 'INFORMATION',
  source: {
    transactionHash:
      '0xe4aaeb3dc33a734348bf2849f4e29ad3ffe3fd2754f6ff8364f08ec74f743491',
    block: {
      number: 32167458,
      chainId: 137
    },
    bot: {
      id: '0xf2de9ee6b6b9491fc2e5ff278221d53059f03ce17a4c3fc886652acbe6d21329'
    }
  },
  severity: SEVERITY.unknown,
  metadata: {
    amount: '500000000000000000000',
    recipient: '0x772740118a4fF24ad7b0E586ef13798Bd7D2b349',
    symbol: 'jEUR',
    token: '0x4e3Decbb3645551B8A19f0eA1678079FCB33fB4c',
    tvlPercentage: '64.6977093215431472'
  },
  projects: [
    {
      name: 'Balancer V2',
      id: 'balancer_v2',
      website: null
    },
    {
      name: 'Balancer V2',
      id: 'balancer_v2',
      website: null
    }
  ],
  alertId: 'BAL-4'
};

export const mockAlert2 = {
  createdAt: '2022-08-20T00:04:02.22279591Z',
  name: 'Large flash loan',
  description:
    'A flash loan to 0xD3934f6D0102467965c066a87cD0FD6bEc152AF8 of 77 FRAX, was detected. The amount made up 50.9% of the TVL.',
  protocol: 'Balancer',
  findingType: 'INFORMATION',
  source: {
    transactionHash:
      '0x07bf6e271cce77d1efbd5abe75a6eed50fa8ca943b6255dacee5e8ae8f8d28f9',
    block: {
      number: 32090778,
      chainId: 137
    },
    bot: {
      id: '0xf2de9ee6b6b9491fc2e5ff278221d53059f03ce17a4c3fc886652acbe6d21329'
    }
  },
  severity: SEVERITY.info,
  metadata: {
    amount: '77000000000000000000',
    recipient: '0xD3934f6D0102467965c066a87cD0FD6bEc152AF8',
    symbol: 'FRAX',
    token: '0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89',
    tvlPercentage: '50.9003616471939238'
  },
  projects: [
    {
      name: 'Usdc',
      id: 'usdc',
      website: null
    },
    {
      name: 'Qidao',
      id: 'qidao',
      website: null
    },
    {
      name: 'Balancer V2',
      id: 'balancer_v2',
      website: null
    },
    {
      name: 'Mahadao',
      id: 'mahadao',
      website: null
    },
    {
      name: 'Balancer V2',
      id: 'balancer_v2',
      website: null
    }
  ],
  alertId: 'BAL-4'
};

export const mockAlert3 = {
  hash: '0x111261a01818b67a44f5eb1b674131b7b5bc3444de76c5a2462c142e1df11b6e',
  createdAt: '2022-08-08T09:17:47.042789895Z',
  name: 'Minimum Account Balance',
  protocol: 'ethereum',
  findingType: 'SUSPICIOUS',
  alertId: 'FORTA-0',
  source: {
    transactionHash: '',
    block: {
      number: 44467860,
      chainId: 250
    },
    bot: {
      id: '0xd1ab03db1e48d8a8b029cb06952fbed13b41c8e4d4e095cccdf0ba4df9cfc3a8'
    }
  },
  severity: SEVERITY.low,
  metadata: {
    balance: '0'
  },
  description: 'Account balance (0) below threshold (500000000000000000)',
  addresses: null,
  projects: null
};

export const mockAlert4 = {
  hash: '0x38c261a01818b67a44f5eb1b674131b7b5bc3444de76c5a2462c142e1df11b6e',
  description:
    'Voter of proposal #24 suffered a decrease of voting power greater than 10 in the following 180000 blocks after the voting end.',
  severity: SEVERITY.medium,
  createdAt: '2022-04-08T09:17:47.042789895Z',
  protocol: 'uniswap',
  name: 'Influencing Voter in Governance Proposal',
  alertId: 'GOVERNANCE-ALERT-2',
  addresses: [
    '0x1041e66182c892d2ba9666f43c1c73c0ab8f5d09',
    '0x74de5d4fcbf63e00296fd95d33236b9794016631',
    '0x34cfac646f301356faa8b21e94227e3583fe3f5f',
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    '0xdfa7bd39ded0051b2ecc48f7e17f63ecd165cae1',
    '0x1111111254fb6c44bac0bed2854e76f90643097d',
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    '0x881d40237659c251811cec9c364ef91dc08d300c',
    '0x9deb29c9a4c7a88a3c0257393b7f3335338d9a9d',
    '0xf326e4de8f66a0bdc0970b79e0924e33c79f1915',
    '0xd360131b77ead72f1f23fb185b4896fe01dc8cb5'
  ],
  source: {
    transactionHash:
      '0x130e54b1f9f725ba434bc8d4145b2180196aa7c4c15a0198f4f0f94e458e5ceb',
    agent: {
      id: '0xfbef77cf5e044f1adb89d0b495945cca6cab88ee1171349eace10b044e834c31',
      name: null
    },
    block: {
      chainId: 1,
      number: 15365152,
      timestamp: '2022-08-18T13:01:14Z'
    }
  },
  contracts: [],
  projects: [
    {
      id: 'uniswap',
      name: 'Uniswap'
    },
    {
      id: 'gnosis_safe',
      name: 'Gnosis Safe'
    },
    {
      id: 'zeroex',
      name: 'Zeroex'
    }
  ]
};

export const mockAlert5 = {
  createdAt: '2022-08-22T07:33:42.863982346Z',
  name: 'Previously approved assets transferred',
  description:
    '0x2C5F1F4b62c31D122f170828F5e432c24805df2f transferred 2 assets from 3 accounts over period of 9 days',
  protocol: 'ethereum',
  findingType: 'EXPLOIT',
  source: {
    transactionHash: '',
    block: {
      number: 45430801,
      chainId: 250
    },
    bot: {
      id: '0xd9fe61cfe875470b80318a96cc0a94ba3adbe1eb4a14827fa018f14925e7da64'
    }
  },
  severity: SEVERITY.high,
  metadata: {
    assetsImpacted:
      '0xddcb3ffd12750b45d32e084887fdf1aabab34239,0x92df3eabf7c1c2a6b3d5793f6d53778ea78c48b2',
    firstTransactionHash:
      '0xd14f90a92fcecc1543b2462a2933ea4a5f4198690af6664d027dd9911649c410',
    lastTransactionHash:
      '0x32b57e401547dc5e96b124c8aba9c3fa8584534d4568e5e54cfcc326698dbd86'
  },
  projects: null,
  alertId: 'ICE-PHISHING-PREV-APPROVED-TRANSFERED'
};

export const mockAlert6 = {
  createdAt: '2022-08-22T07:03:07.344328487Z',
  name: 'High Gas Price',
  description:
    'Gas price in transaction 0xab3b99ae1196158d539a7aa1b12a96a654b944ee27a378d12f18773a435539ef is 2658454784',
  protocol: 'ethereum',
  findingType: 'SUSPICIOUS',
  source: {
    transactionHash:
      '0xab3b99ae1196158d539a7aa1b12a96a654b944ee27a378d12f18773a435539ef',
    block: {
      number: 45429198,
      chainId: 250
    },
    bot: {
      id: '0xe27867c40008e0e3533d6dba7d3c1f26a61a3923bc016747d131f868f8f34555'
    }
  },
  severity: SEVERITY.critical,
  metadata: {
    distance: '1000000000000',
    gasPrice: '2658454784'
  },
  projects: null,
  alertId: 'FORTA-2'
};
