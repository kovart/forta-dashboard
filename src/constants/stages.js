export const STAGE_COLOR = {
  grey: '#a7a7a7',
  blue: '#2563eb',
  green: '#059669',
  orange: '#d97706',
  red: '#b91c1c',
  pink: '#ce00e8'
};

// TODO Complete and optimize kits

export const FortaGeneralKit = {
  key: 'general-kit',
  name: 'Forta General Kit',
  botIds: [
    '0xd9fe61cfe875470b80318a96cc0a94ba3adbe1eb4a14827fa018f14925e7da64', // ice phishing
    '0x457aa09ca38d60410c8ffa1761f535f23959195a56c9b82e0207801e86b34d99', // suspicious contract creation
    '0xaedda4252616d971d570464a3ae4a9f0a9d72a57d8581945fff648d03cd30a7d', // blocklisted account tx
    '0x4cc272e78a685e27abcccdb40578f91f43baecc43e3c465460991a9dcdcb9756', // tornado cash withdrawl
    '0x617c356a4ad4b755035ef8024a87d36d895ee3cb0864e7ce9b3cf694dd80c82a', // Tornado Cash Funded Account Interaction
    '0x492c05269cbefe3a1686b999912db1fb5a39ce2e4578ac3951b0542440f435d9', // reentrancy
    '0x4adff9a0ed29396d51ef3b16297070347aab25575f04a4e2bd62ec43ca4508d2', // money laundering
    '0x0ffe038c802784f739bb27fcd4274f71c384fea78de87c9ef8d5b3fb72b514c7', // high gas usage
    '0xe27867c40008e0e3533d6dba7d3c1f26a61a3923bc016747d131f868f8f34555', // high gas price
    '0xbf953b115fd214e1eb5c4d6f556ea30f0df47bd86bf35ce1fdaeff03dc7df5b7', // high value transaction
    '0x11b3d9ffb13a72b776e1aed26616714d879c481d7a463020506d1fb5f33ec1d4', // forta-text-messages-agent
    '0x20d57d727a2d7bf4b447d1952d7ea44efeda0920e45e779d298d5385f3b36cfa', // Transaction Volume Anomaly Detection
    '0x55636f5577694c83b84b0687eb77863850c50bd9f6072686c8463a0cbc5566e0', // Flashloan Detection Bot
    '0x2c8452ff81b4fa918a8df4441ead5fedd1d4302d7e43226f79cb812ea4962ece', // Large Mint Borrow Volume Anomaly Detection
    '0x6aa2012744a3eb210fc4e4b794d9df59684d36d502fd9efe509a867d0efa5127', // Token Impersonation
    '0x0f21668ebd017888e7ee7dd46e9119bdd2bc7f48dbabc375d96c9b415267534c', // Smart Price Change Bot
    '0xbc06a40c341aa1acc139c900fd1b7e3999d71b80c13a9dd50a369d8f923757f5', // Flashbot
    '0xfcf3ee41d04eee52f7944387010bc8aa6f22d54c36576c9a05db7e6cafda41f9', // balance decrease for bridge: polygon (ether) - Ethereum Mainnet
    '0xca504ee43501fe7c20084aa3112f8f57dd8c1e0e8a85d3884b66c252d6fc4f5b', // balance decrease for bridge: polygon (ERC20) - Ethereum Mainnet
    '0xa4b00d881c92526ef9a1db39cd3da2b7f32958eab2d7bb807546b7fd1a520748', // balance decrease for bridge: Avalanche - Ethereum Mainnet
    '0x942c63db47285d28f01fba0a4e998f815f9784bf246fd981694fd1bcbc0e75c8', // balance decrease for bridge: Arbitrum (Ether Gateway) - Ethereum Mainnet
    '0x6f07249485378615abb12b352f7f0e9c68e6bab2de57475b963445e5639fced3', // balance decrease for bridge: Arbitrum (ERC20) - Ethereum Mainnet
    '0x4db4efcb505c19e076f1716f9c79d919ffb6a9802769b470e8d461066730c723', // balance decrease for bridge: Arbitrum (Custom Gateway) - Ethereum Mainnet
    '0x3f5d0e780a99c3058b58884844e4c71df34b2b739fd957847facc77f69e9f2cc', // balance decrease for bridge: Near/Aurora (Ether) - Ethereum Mainnet
    '0x59cc55fc71711d81d99be376618e072fa34e1ddbda7401840542d9a584a78d08', // balance decrease for bridge: Near/Aurora (ERC20) - Ethereum Mainnet
    '0x94f879d399f7fe7a06682d3abd58a955624ec08b9164c3838851bf6788d27e33', // balance decrease for bridge: Optimism V1 - Ethereum Mainnet
    '0x5474812f32fa8206c178864bb7f95f737ab9cdb1e4125af2e86ad8dd8c5fbf31', // balance decrease for bridge: Optimism V2 - Ethereum Mainnet
    '0x966929e33d640fead63ed3307ee802e1a45a5b3fabe8c796acf1d6bceb2c757e', // balance decrease for bridge: Harmony (Ether) - Ethereum Mainnet
    '0xb9008e67f9a2425dc0e11f80d8d26880ec83880b9a169c9542a8e8d74337bb44', // balance decrease for bridge: Harmony (ERC20) - Ethereum Mainnet
    '0xee1a0da8184264ed000c2d33f0a6e0df3aa43ad515c21b8320a00aea8c3ae457', // balance decrease for bridge: Harmony (BUSD) - Ethereum Mainnet
    '0xe4cee68ce6b2d75ce17a2c727b92838a32e698eacb8848caaf6dade6f9330c12', // balance decrease for bridge: xDai - Ethereum Mainnet
    '0xdac6f4a16776648ef48b0c9850800507059e201139c2aa898b47d51ca0ebdaae', // balance decrease for bridge: Boba - Ethereum Mainnet
    '0x742da1d837ac91905ec470d4e9d92e9c31a3104aa05a014a8f51ba355135bf8a', // balance decrease for bridge: Ronin - Ethereum Mainnet
    '0x7b69174f32b91731d9b6245faaff945637c47f729a850fa312a27238bc98f383', // balance decrease for bridge: THORChain - Ethereum Mainnet
    '0xc10fe54aa93d43702eece2c439550ee079b5fa045aa03e08d47df6a3837e172b', // balance decrease for bridge: Multichain/Anyswap (ALTA) - BSC
    '0xf947dfa6387710dd316cb9b1afec82d1f49d187426c8f6370000cddc2bec945d', // balance decrease for bridge: Multichain/Anyswap (USDC) - Ethereum Mainnet
    '0x3d1242fb8af0cdd548e7b5e073534f298f7ddaebbafe931a3506ab0be0e67e87', // balance decrease for bridge: Multichain/Anyswap  (Marlin POND) - FTM
    '0x0b069cddde485c14666b35e13c0e0919e6bbb00ea7b0df711e45701b77841492', // balance decrease for bridge: Multichain/Anyswap (USDT) - Ethereum Mainnet
    '0x19f468cbd6924a77fcb375a130e3bd1d3764366e42d4d7e6db0717a2229bfeba', // balance decrease for bridge: Multichain/Anyswap (USDT) - Polygon
    '0xe8527df509859e531e58ba4154e9157eb6d9b2da202516a66ab120deabd3f9f6', // attack simulation
    '0x4c7e56a9a753e29ca92bd57dd593bdab0c03e762bdd04e2bc578cb82b842c1f3', // unverified contract creation
    '0x2e51c6a89c2dccc16a813bb0c3bf3bbfe94414b6a0ea3fc650ad2a59e148f3c8', // anomalous transaction bot
    '0xee275019391109f9ce0de16b78e835c261af1118afeb1a1048a08ccbf67c3ea8' // social eng contract creation
  ],
  stages: [
    {
      label: 'Funding',
      color: STAGE_COLOR.blue,
      alertIds: [
        'AE-FORTA-0', //  tornado cash withdrawl
        'TORNADO-CASH-FUNDED-ACCOUNT-INTERACTION' // tornado cash funding
      ]
    },
    {
      label: 'Preparation',
      color: STAGE_COLOR.orange,
      alertIds: [
        'ICE-PHISHING-HIGH-NUM-APPROVALS', // ice phishing
        'SUSPICIOUS-CONTRACT-CREATION', // suspicious contract creation
        'SUSPICIOUS-CONTRACT-CREATION-TORNADO-CASH', // suspicious contract creation
        'FORTA-BLOCKLIST-ADDR-TX', // blocklisted account tx
        'IMPERSONATED-TOKEN-DEPLOYMENT', // Token Impersonation
        'SMART-PRICE-CHANGES', // Smart Price Change Bot
        'AK-ATTACK-SIMULATION-0', // Attack Simulation
        'UNVERIFIED-CODE-CONTRACT-CREATION', // unverified contract creation
        'SOCIAL-ENG-CONTRACT-CREATION' // Social Engineering Contract Creation
      ]
    },
    {
      label: 'Exploitation',
      color: STAGE_COLOR.red,
      alertIds: [
        'NETHFORTA-25', // reentrancy
        'IMPOSSIBLE-2', // high gas usage (but really also high gas price)
        'FORTA-2', // high gas price
        'NETHFORTA-2', // high value transaction
        'SUCCESSFUL-INTERNAL-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'SUCCESSFUL-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'FAILED-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'FAILED-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'FLASHLOAN-ATTACK', // Flashloan Detection Bot
        'HIGH-MINT-VALUE', // Large Mint Borrow Volume Anomaly Detection
        'HIGH-BORROW-VALUE', // Large Mint Borrow Volume Anomaly Detection
        'FLASHBOT-TRANSACTION', // Flashbot
        'BALANCE-DECREASE-ASSETS-ALL-REMOVED', // balance decrease for bridges
        'BALANCE-DECREASE-ASSETS-PORTION-REMOVED', // balance decrease for bridges
        'ANOMALOUS-TOKEN-TRANSFERS-TX' // Anomalous Token Transfer
      ]
    },
    {
      label: 'Laundering',
      color: STAGE_COLOR.pink,
      alertIds: [
        'POSSIBLE-MONEY-LAUNDERING-TORNADO-CASH', // money laundering
        'forta-text-messages-possible-hack' // text message agent - high severity only
      ]
    }
  ]
};

export const ExperimentalGeneralKit = {
  key: 'experimental-general-kit',
  name: 'Experimental General Kit',
  botIds: [
    '0xd9fe61cfe875470b80318a96cc0a94ba3adbe1eb4a14827fa018f14925e7da64', // ice phishing
    '0x457aa09ca38d60410c8ffa1761f535f23959195a56c9b82e0207801e86b34d99', // suspicious contract creation
    '0xaedda4252616d971d570464a3ae4a9f0a9d72a57d8581945fff648d03cd30a7d', // blocklisted account tx
    '0x4cc272e78a685e27abcccdb40578f91f43baecc43e3c465460991a9dcdcb9756', // tornado cash withdrawl
    '0x617c356a4ad4b755035ef8024a87d36d895ee3cb0864e7ce9b3cf694dd80c82a', // Tornado Cash Funded Account Interaction
    '0x492c05269cbefe3a1686b999912db1fb5a39ce2e4578ac3951b0542440f435d9', // reentrancy
    '0x4adff9a0ed29396d51ef3b16297070347aab25575f04a4e2bd62ec43ca4508d2', // money laundering
    '0x0ffe038c802784f739bb27fcd4274f71c384fea78de87c9ef8d5b3fb72b514c7', // high gas usage
    '0xe27867c40008e0e3533d6dba7d3c1f26a61a3923bc016747d131f868f8f34555', // high gas price
    '0xbf953b115fd214e1eb5c4d6f556ea30f0df47bd86bf35ce1fdaeff03dc7df5b7', // high value transaction
    '0x11b3d9ffb13a72b776e1aed26616714d879c481d7a463020506d1fb5f33ec1d4', // forta-text-messages-agent
    '0x20d57d727a2d7bf4b447d1952d7ea44efeda0920e45e779d298d5385f3b36cfa', // Transaction Volume Anomaly Detection
    '0x55636f5577694c83b84b0687eb77863850c50bd9f6072686c8463a0cbc5566e0', // Flashloan Detection Bot
    '0x2c8452ff81b4fa918a8df4441ead5fedd1d4302d7e43226f79cb812ea4962ece', // Large Mint Borrow Volume Anomaly Detection
    '0x6aa2012744a3eb210fc4e4b794d9df59684d36d502fd9efe509a867d0efa5127', // Token Impersonation
    '0x0f21668ebd017888e7ee7dd46e9119bdd2bc7f48dbabc375d96c9b415267534c', // Smart Price Change Bot
    '0xbc06a40c341aa1acc139c900fd1b7e3999d71b80c13a9dd50a369d8f923757f5', // Flashbot
    '0xfcf3ee41d04eee52f7944387010bc8aa6f22d54c36576c9a05db7e6cafda41f9', // balance decrease for bridge: polygon (ether) - Ethereum Mainnet
    '0xca504ee43501fe7c20084aa3112f8f57dd8c1e0e8a85d3884b66c252d6fc4f5b', // balance decrease for bridge: polygon (ERC20) - Ethereum Mainnet
    '0xa4b00d881c92526ef9a1db39cd3da2b7f32958eab2d7bb807546b7fd1a520748', // balance decrease for bridge: Avalanche - Ethereum Mainnet
    '0x942c63db47285d28f01fba0a4e998f815f9784bf246fd981694fd1bcbc0e75c8', // balance decrease for bridge: Arbitrum (Ether Gateway) - Ethereum Mainnet
    '0x6f07249485378615abb12b352f7f0e9c68e6bab2de57475b963445e5639fced3', // balance decrease for bridge: Arbitrum (ERC20) - Ethereum Mainnet
    '0x4db4efcb505c19e076f1716f9c79d919ffb6a9802769b470e8d461066730c723', // balance decrease for bridge: Arbitrum (Custom Gateway) - Ethereum Mainnet
    '0x3f5d0e780a99c3058b58884844e4c71df34b2b739fd957847facc77f69e9f2cc', // balance decrease for bridge: Near/Aurora (Ether) - Ethereum Mainnet
    '0x59cc55fc71711d81d99be376618e072fa34e1ddbda7401840542d9a584a78d08', // balance decrease for bridge: Near/Aurora (ERC20) - Ethereum Mainnet
    '0x94f879d399f7fe7a06682d3abd58a955624ec08b9164c3838851bf6788d27e33', // balance decrease for bridge: Optimism V1 - Ethereum Mainnet
    '0x5474812f32fa8206c178864bb7f95f737ab9cdb1e4125af2e86ad8dd8c5fbf31', // balance decrease for bridge: Optimism V2 - Ethereum Mainnet
    '0x966929e33d640fead63ed3307ee802e1a45a5b3fabe8c796acf1d6bceb2c757e', // balance decrease for bridge: Harmony (Ether) - Ethereum Mainnet
    '0xb9008e67f9a2425dc0e11f80d8d26880ec83880b9a169c9542a8e8d74337bb44', // balance decrease for bridge: Harmony (ERC20) - Ethereum Mainnet
    '0xee1a0da8184264ed000c2d33f0a6e0df3aa43ad515c21b8320a00aea8c3ae457', // balance decrease for bridge: Harmony (BUSD) - Ethereum Mainnet
    '0xe4cee68ce6b2d75ce17a2c727b92838a32e698eacb8848caaf6dade6f9330c12', // balance decrease for bridge: xDai - Ethereum Mainnet
    '0xdac6f4a16776648ef48b0c9850800507059e201139c2aa898b47d51ca0ebdaae', // balance decrease for bridge: Boba - Ethereum Mainnet
    '0x742da1d837ac91905ec470d4e9d92e9c31a3104aa05a014a8f51ba355135bf8a', // balance decrease for bridge: Ronin - Ethereum Mainnet
    '0x7b69174f32b91731d9b6245faaff945637c47f729a850fa312a27238bc98f383', // balance decrease for bridge: THORChain - Ethereum Mainnet
    '0xc10fe54aa93d43702eece2c439550ee079b5fa045aa03e08d47df6a3837e172b', // balance decrease for bridge: Multichain/Anyswap (ALTA) - BSC
    '0xf947dfa6387710dd316cb9b1afec82d1f49d187426c8f6370000cddc2bec945d', // balance decrease for bridge: Multichain/Anyswap (USDC) - Ethereum Mainnet
    '0x3d1242fb8af0cdd548e7b5e073534f298f7ddaebbafe931a3506ab0be0e67e87', // balance decrease for bridge: Multichain/Anyswap  (Marlin POND) - FTM
    '0x0b069cddde485c14666b35e13c0e0919e6bbb00ea7b0df711e45701b77841492', // balance decrease for bridge: Multichain/Anyswap (USDT) - Ethereum Mainnet
    '0x19f468cbd6924a77fcb375a130e3bd1d3764366e42d4d7e6db0717a2229bfeba', // balance decrease for bridge: Multichain/Anyswap (USDT) - Polygon
    '0xe8527df509859e531e58ba4154e9157eb6d9b2da202516a66ab120deabd3f9f6', // attack simulation
    '0x4c7e56a9a753e29ca92bd57dd593bdab0c03e762bdd04e2bc578cb82b842c1f3', // unverified contract creation
    '0x2e51c6a89c2dccc16a813bb0c3bf3bbfe94414b6a0ea3fc650ad2a59e148f3c8', // anomalous transaction bot
    '0xee275019391109f9ce0de16b78e835c261af1118afeb1a1048a08ccbf67c3ea8', // social eng contract creation
    '0x8badbf2ad65abc3df5b1d9cc388e419d9255ef999fb69aac6bf395646cf01c14', // Ice Phishing Detection 2.0,
    '0x20d0cd9432c7e15cb625097a718c15cc07f463b5252e3c36ae23acb7ef98d54e' // NFT Sleep Minting Detection,
  ],
  stages: [
    {
      label: 'Funding',
      color: STAGE_COLOR.blue,
      alertIds: [
        'AE-FORTA-0', //  tornado cash withdrawl
        'TORNADO-CASH-FUNDED-ACCOUNT-INTERACTION' // tornado cash funding
      ]
    },
    {
      label: 'High Gas',
      color: STAGE_COLOR.green,
      alertIds: [
        'IMPOSSIBLE-2', // high gas usage (but really also high gas price)
        'FORTA-2' // high gas price
      ]
    },
    {
      label: 'Preparation',
      color: STAGE_COLOR.orange,
      alertIds: [
        'ICE-PHISHING-HIGH-NUM-APPROVALS', // ice phishing
        'SUSPICIOUS-CONTRACT-CREATION', // suspicious contract creation
        'SUSPICIOUS-CONTRACT-CREATION-TORNADO-CASH', // suspicious contract creation
        'FORTA-BLOCKLIST-ADDR-TX', // blocklisted account tx
        'IMPERSONATED-TOKEN-DEPLOYMENT', // Token Impersonation
        'SMART-PRICE-CHANGES', // Smart Price Change Bot
        'AK-ATTACK-SIMULATION-0', // Attack Simulation
        'UNVERIFIED-CODE-CONTRACT-CREATION', // unverified contract creation
        'SOCIAL-ENG-CONTRACT-CREATION' // Social Engineering Contract Creation
      ]
    },
    {
      label: 'Exploitation',
      color: STAGE_COLOR.red,
      alertIds: [
        'NETHFORTA-25', // reentrancy
        'SUCCESSFUL-INTERNAL-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'SUCCESSFUL-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'FAILED-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'FAILED-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'FLASHLOAN-ATTACK', // Flashloan Detection Bot
        'HIGH-MINT-VALUE', // Large Mint Borrow Volume Anomaly Detection
        'HIGH-BORROW-VALUE', // Large Mint Borrow Volume Anomaly Detection
        'FLASHBOT-TRANSACTION', // Flashbot
        'BALANCE-DECREASE-ASSETS-ALL-REMOVED', // balance decrease for bridges
        'BALANCE-DECREASE-ASSETS-PORTION-REMOVED', // balance decrease for bridges
        'ANOMALOUS-TOKEN-TRANSFERS-TX' // Anomalous Token Transfer
      ]
    },
    {
      label: 'Laundering',
      color: STAGE_COLOR.pink,
      alertIds: [
        'POSSIBLE-MONEY-LAUNDERING-TORNADO-CASH' // money laundering
      ]
    },
    {
      label: 'Post Attack',
      color: STAGE_COLOR.pink,
      alertIds: [
        'forta-text-messages-possible-hack' // text message agent - high severity only
      ]
    }
  ],
  sort: (groups) => {
    groups.sort((g1, g2) => {
      const calcScore = (g) => {
        let score = g.stageLabels.length * 10;
        score += Number(g.stageLabels.includes('Funding'));
        score += Number(g.stageLabels.includes('Laundering'));
        score += Number(
          g.stageLabels.includes('Preparation') &&
            g.stageLabels.includes('Exploitation')
        );
        return score;
      };

      return calcScore(g2) - calcScore(g1);
    });
  }
};

export const FortaScamKit = {
  key: 'scam-kit',
  name: 'Experimental Scam Kit',
  botIds: [
    '0xd9fe61cfe875470b80318a96cc0a94ba3adbe1eb4a14827fa018f14925e7da64', // ice phishing
    '0x457aa09ca38d60410c8ffa1761f535f23959195a56c9b82e0207801e86b34d99', // suspicious contract creation
    '0x4cc272e78a685e27abcccdb40578f91f43baecc43e3c465460991a9dcdcb9756', // tornado cash withdrawal
    '0x617c356a4ad4b755035ef8024a87d36d895ee3cb0864e7ce9b3cf694dd80c82a', // Tornado Cash Funded Account Interaction
    '0x4adff9a0ed29396d51ef3b16297070347aab25575f04a4e2bd62ec43ca4508d2', // money laundering
    '0x0ffe038c802784f739bb27fcd4274f71c384fea78de87c9ef8d5b3fb72b514c7', // high gas usage
    '0xe27867c40008e0e3533d6dba7d3c1f26a61a3923bc016747d131f868f8f34555', // high gas price
    '0xbf953b115fd214e1eb5c4d6f556ea30f0df47bd86bf35ce1fdaeff03dc7df5b7', // high value transaction
    '0x20d57d727a2d7bf4b447d1952d7ea44efeda0920e45e779d298d5385f3b36cfa', // Transaction Volume Anomaly Detection
    '0x6aa2012744a3eb210fc4e4b794d9df59684d36d502fd9efe509a867d0efa5127', // Token Impersonation
    '0x11b3d9ffb13a72b776e1aed26616714d879c481d7a463020506d1fb5f33ec1d4', // text message agent
    '0x4c7e56a9a753e29ca92bd57dd593bdab0c03e762bdd04e2bc578cb82b842c1f3', // unverified contract creation
    '0x2e51c6a89c2dccc16a813bb0c3bf3bbfe94414b6a0ea3fc650ad2a59e148f3c8', // anomalous transaction bot
    '0xee275019391109f9ce0de16b78e835c261af1118afeb1a1048a08ccbf67c3ea8', // social eng contract creation,
    '0x8badbf2ad65abc3df5b1d9cc388e419d9255ef999fb69aac6bf395646cf01c14', // Ice Phishing Detection 2.0,
    '0x20d0cd9432c7e15cb625097a718c15cc07f463b5252e3c36ae23acb7ef98d54e', // NFT Sleep Minting Detection,
    '0xaa64eef3c1d2dbfb88c992896faf4e15a1dd443001ff19479c0f63601a861125' // forta-ae-suspicious-approvals
  ],
  stages: [
    {
      label: 'Funding',
      color: STAGE_COLOR.blue,
      alertIds: [
        'AE-FORTA-0', //  tornado cash withdrawal
        'TORNADO-CASH-FUNDED-ACCOUNT-INTERACTION' // tornado cash funding
      ]
    },
    {
      label: 'Preparation',
      color: STAGE_COLOR.orange,
      alertIds: [
        'SUSPICIOUS-CONTRACT-CREATION', // suspicious contract creation
        'SUSPICIOUS-CONTRACT-CREATION-TORNADO-CASH', // suspicious contract creation
        'FORTA-BLOCKLIST-ADDR-TX', // blocklisted account tx
        'IMPERSONATED-TOKEN-DEPLOYMENT', // Token Impersonation
        'SMART-PRICE-CHANGES', // Smart Price Change Bot
        'UNVERIFIED-CODE-CONTRACT-CREATION', // unverified contract creation
        'SOCIAL-ENG-CONTRACT-CREATION' // Social Engineering Contract Creation
      ]
    },
    {
      label: 'High Gas',
      color: STAGE_COLOR.green,
      alertIds: [
        'IMPOSSIBLE-2', // high gas usage (but really also high gas price)
        'FORTA-2' // high gas price
      ]
    },
    {
      label: 'Performance',
      color: STAGE_COLOR.red,
      alertIds: [
        'ICE-PHISHING-HIGH-NUM-APPROVALS', // ice phishing
        'SLEEPMINT-1', // NFT Sleep Minting Agent
        'SLEEPMINT-2', //NFT Sleep Minting Agent
        'NETHFORTA-2', // high value transaction
        'SUCCESSFUL-INTERNAL-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'SUCCESSFUL-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'FAILED-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'FAILED-TRANSACTION-VOL-INCREASE', // Transaction Volume Anomaly Detection
        'AE-SUSPICIOUS-APPROVALS' // forta-ae-suspicious-approvals
      ]
    },
    {
      label: 'Laundering',
      color: STAGE_COLOR.pink,
      alertIds: [
        'POSSIBLE-MONEY-LAUNDERING-TORNADO-CASH' // money laundering
      ]
    },
    {
      label: 'Post Attack',
      color: STAGE_COLOR.pink,
      alertIds: [
        'forta-text-messages-possible-hack' // text message agent - high severity only
      ]
    }
  ],
  sort: (groups) => {
    groups.sort((g1, g2) => {
      const calcScore = (g) => {
        let score = g.stageLabels.length * 10;
        score += Number(g.stageLabels.includes('Funding'));
        score += Number(g.stageLabels.includes('Laundering'));
        score += Number(
          g.stageLabels.includes('Preparation') &&
            g.stageLabels.includes('Performance')
        );
        return score;
      };

      return calcScore(g2) - calcScore(g1);
    });
  }
};
