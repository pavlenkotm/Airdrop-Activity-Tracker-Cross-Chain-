import { ethers } from 'ethers';
import { Network } from '@/types';
import { NETWORK_CONFIGS } from '@/config/networks';

// Cache providers to avoid creating multiple instances
const providers: Map<Network, ethers.JsonRpcProvider> = new Map();

export function getProvider(network: Network): ethers.JsonRpcProvider {
  if (!providers.has(network)) {
    const config = NETWORK_CONFIGS[network];
    const provider = new ethers.JsonRpcProvider(config.rpcUrl, {
      chainId: config.chainId,
      name: config.name,
    });
    providers.set(network, provider);
  }
  return providers.get(network)!;
}

export function isValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}

export function formatAddress(address: string): string {
  return ethers.getAddress(address);
}
