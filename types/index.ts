// Network types
export enum Network {
  ETHEREUM = 'ethereum',
  ARBITRUM = 'arbitrum',
  OPTIMISM = 'optimism',
  BASE = 'base',
  ZKSYNC = 'zksync',
}

export interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  coingeckoId: string;
}

// Airdrop criteria types
export interface AirdropCriteria {
  id: string;
  name: string;
  description: string;
  networks: Network[];
  criteria: {
    minTransactions?: number;
    minVolume?: number; // in USD
    minActiveDays?: number;
    minActiveWeeks?: number;
    requiredContracts?: string[];
    minContractInteractions?: number;
    requiresBridge?: boolean;
    minBridgeTransactions?: number;
  };
  contracts?: {
    [key: string]: {
      address: string;
      network: Network;
      name: string;
      type: string;
    }[];
  };
}

// Activity types
export interface TransactionData {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  blockNumber: number;
  network: Network;
  gasUsed: string;
  gasPrice: string;
}

export interface ActivityStats {
  network: Network;
  totalTransactions: number;
  totalVolumeUSD: number;
  activeDays: number;
  activeWeeks: number;
  contractInteractions: {
    [contractAddress: string]: number;
  };
  bridgeTransactions: number;
  firstTransaction?: number;
  lastTransaction?: number;
}

export interface AirdropStatus {
  airdropId: string;
  airdropName: string;
  status: 'ok' | 'warning' | 'incomplete';
  message: string;
  requirements: RequirementStatus[];
  totalStats: {
    totalTransactions: number;
    totalVolumeUSD: number;
    activeDays: number;
    activeWeeks: number;
    totalContractInteractions: number;
    bridgeTransactions: number;
  };
  networkStats: ActivityStats[];
}

export interface RequirementStatus {
  name: string;
  required: number | boolean;
  current: number | boolean;
  met: boolean;
  description: string;
}

// API response types
export interface CheckActivityResponse {
  address: string;
  airdrops: AirdropStatus[];
  totalStats: ActivityStats[];
  lastChecked: number;
}

export interface PriceData {
  [network: string]: {
    usd: number;
  };
}
