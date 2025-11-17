import { Network, NetworkConfig } from '@/types';

export const NETWORK_CONFIGS: Record<Network, NetworkConfig> = {
  [Network.ETHEREUM]: {
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: 'https://eth.public-rpc.com',
    explorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    coingeckoId: 'ethereum',
  },
  [Network.ARBITRUM]: {
    name: 'Arbitrum One',
    chainId: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    coingeckoId: 'ethereum',
  },
  [Network.OPTIMISM]: {
    name: 'Optimism',
    chainId: 10,
    rpcUrl: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    coingeckoId: 'ethereum',
  },
  [Network.BASE]: {
    name: 'Base',
    chainId: 8453,
    rpcUrl: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    coingeckoId: 'ethereum',
  },
  [Network.ZKSYNC]: {
    name: 'zkSync Era',
    chainId: 324,
    rpcUrl: 'https://mainnet.era.zksync.io',
    explorer: 'https://explorer.zksync.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    coingeckoId: 'ethereum',
  },
};

// Bridge contract addresses (popular bridges)
export const BRIDGE_CONTRACTS: Record<Network, string[]> = {
  [Network.ETHEREUM]: [
    '0x8484Ef722627bf18ca5Ae6BcF031c23E6e922B30', // Arbitrum Bridge
    '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1', // Optimism Bridge
    '0x3154Cf16ccdb4C6d922629664174b904d80F2C35', // Base Bridge
    '0x32400084C286CF3E17e7B677ea9583e60a000324', // zkSync Bridge
  ],
  [Network.ARBITRUM]: [
    '0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a', // Arbitrum Bridge
  ],
  [Network.OPTIMISM]: [
    '0x4200000000000000000000000000000000000010', // Optimism Bridge
  ],
  [Network.BASE]: [
    '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e', // Base Bridge
  ],
  [Network.ZKSYNC]: [
    '0x32400084C286CF3E17e7B677ea9583e60a000324', // zkSync Bridge
  ],
};
