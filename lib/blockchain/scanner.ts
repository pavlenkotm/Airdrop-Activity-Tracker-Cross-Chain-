import { Network, ActivityStats, TransactionData } from '@/types';
import { BRIDGE_CONTRACTS } from '@/config/networks';
import { getProvider } from './provider';

export async function scanWalletActivity(
  address: string,
  network: Network
): Promise<ActivityStats> {
  const provider = getProvider(network);

  const stats: ActivityStats = {
    network,
    totalTransactions: 0,
    totalVolumeUSD: 0,
    activeDays: 0,
    activeWeeks: 0,
    contractInteractions: {},
    bridgeTransactions: 0,
  };

  try {
    // Get transaction count
    stats.totalTransactions = await provider.getTransactionCount(address);

    // In a real implementation, you would:
    // 1. Use block explorer API (Etherscan, Arbiscan, etc.) to get full tx history
    // 2. Parse each transaction to determine:
    //    - Contract interactions
    //    - Bridge transactions
    //    - Transaction volumes
    //    - Active days/weeks

    // For now, we'll use a simplified approach with transaction count
    // and estimate other metrics based on available on-chain data

  } catch (error) {
    console.error(`Error scanning wallet activity on ${network}:`, error);
  }

  return stats;
}

export function isBridgeTransaction(
  to: string | null,
  network: Network
): boolean {
  if (!to) return false;
  const bridgeAddresses = BRIDGE_CONTRACTS[network].map((addr) =>
    addr.toLowerCase()
  );
  return bridgeAddresses.includes(to.toLowerCase());
}

export function calculateActiveDays(transactions: TransactionData[]): number {
  const uniqueDays = new Set<string>();
  transactions.forEach((tx) => {
    const date = new Date(tx.timestamp * 1000);
    const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    uniqueDays.add(dayKey);
  });
  return uniqueDays.size;
}

export function calculateActiveWeeks(transactions: TransactionData[]): number {
  const uniqueWeeks = new Set<string>();
  transactions.forEach((tx) => {
    const date = new Date(tx.timestamp * 1000);
    const weekNumber = getWeekNumber(date);
    const weekKey = `${date.getFullYear()}-W${weekNumber}`;
    uniqueWeeks.add(weekKey);
  });
  return uniqueWeeks.size;
}

function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function countContractInteractions(
  transactions: TransactionData[],
  contractAddresses: string[]
): Record<string, number> {
  const interactions: Record<string, number> = {};

  contractAddresses.forEach((addr) => {
    interactions[addr.toLowerCase()] = 0;
  });

  transactions.forEach((tx) => {
    const toAddress = tx.to.toLowerCase();
    if (toAddress in interactions) {
      interactions[toAddress]++;
    }
  });

  return interactions;
}
