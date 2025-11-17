import {
  Network,
  ActivityStats,
  AirdropStatus,
  RequirementStatus,
  AirdropCriteria,
} from '@/types';
import { scanWalletActivity } from '@/lib/blockchain/scanner';
import { getTransactionCount } from '@/lib/blockchain/transactions';
import { getAllAirdropConfigs } from '@/config/airdrops';
import { getEthereumPrice, calculateVolumeUSD } from './coingecko';

export async function checkAirdropEligibility(
  address: string
): Promise<AirdropStatus[]> {
  const airdrops = getAllAirdropConfigs();
  const results: AirdropStatus[] = [];

  for (const airdrop of airdrops) {
    const status = await checkSingleAirdrop(address, airdrop);
    results.push(status);
  }

  return results;
}

async function checkSingleAirdrop(
  address: string,
  airdrop: AirdropCriteria
): Promise<AirdropStatus> {
  const networkStats: ActivityStats[] = [];
  let totalTransactions = 0;
  let totalVolumeUSD = 0;
  let maxActiveDays = 0;
  let maxActiveWeeks = 0;
  let totalContractInteractions = 0;
  let totalBridgeTransactions = 0;

  // Scan activity on all required networks
  for (const network of airdrop.networks) {
    const stats = await scanWalletActivity(address, network);
    networkStats.push(stats);

    totalTransactions += stats.totalTransactions;
    totalVolumeUSD += stats.totalVolumeUSD;
    maxActiveDays = Math.max(maxActiveDays, stats.activeDays);
    maxActiveWeeks = Math.max(maxActiveWeeks, stats.activeWeeks);
    totalBridgeTransactions += stats.bridgeTransactions;

    // Count contract interactions
    Object.values(stats.contractInteractions).forEach((count) => {
      totalContractInteractions += count;
    });
  }

  // Estimate volume based on transaction count (simplified)
  // In production, you'd calculate actual transaction values
  const ethPrice = await getEthereumPrice();
  const estimatedVolume = calculateVolumeUSD(totalTransactions * 0.01, ethPrice);
  totalVolumeUSD = Math.max(totalVolumeUSD, estimatedVolume);

  // Check requirements
  const requirements: RequirementStatus[] = [];
  let allMet = true;

  if (airdrop.criteria.minTransactions) {
    const met = totalTransactions >= airdrop.criteria.minTransactions;
    requirements.push({
      name: 'Minimum Transactions',
      required: airdrop.criteria.minTransactions,
      current: totalTransactions,
      met,
      description: `Need at least ${airdrop.criteria.minTransactions} transactions`,
    });
    if (!met) allMet = false;
  }

  if (airdrop.criteria.minVolume) {
    const met = totalVolumeUSD >= airdrop.criteria.minVolume;
    requirements.push({
      name: 'Minimum Volume (USD)',
      required: airdrop.criteria.minVolume,
      current: Math.round(totalVolumeUSD),
      met,
      description: `Need at least $${airdrop.criteria.minVolume} in total volume`,
    });
    if (!met) allMet = false;
  }

  if (airdrop.criteria.minActiveDays) {
    const met = maxActiveDays >= airdrop.criteria.minActiveDays;
    requirements.push({
      name: 'Active Days',
      required: airdrop.criteria.minActiveDays,
      current: maxActiveDays,
      met,
      description: `Need activity on at least ${airdrop.criteria.minActiveDays} different days`,
    });
    if (!met) allMet = false;
  }

  if (airdrop.criteria.minActiveWeeks) {
    const met = maxActiveWeeks >= airdrop.criteria.minActiveWeeks;
    requirements.push({
      name: 'Active Weeks',
      required: airdrop.criteria.minActiveWeeks,
      current: maxActiveWeeks,
      met,
      description: `Need activity across at least ${airdrop.criteria.minActiveWeeks} different weeks`,
    });
    if (!met) allMet = false;
  }

  if (airdrop.criteria.minContractInteractions) {
    const met =
      totalContractInteractions >= airdrop.criteria.minContractInteractions;
    requirements.push({
      name: 'Contract Interactions',
      required: airdrop.criteria.minContractInteractions,
      current: totalContractInteractions,
      met,
      description: `Need at least ${airdrop.criteria.minContractInteractions} interactions with protocol contracts`,
    });
    if (!met) allMet = false;
  }

  if (airdrop.criteria.requiresBridge) {
    const met =
      totalBridgeTransactions >=
      (airdrop.criteria.minBridgeTransactions || 1);
    requirements.push({
      name: 'Bridge Transactions',
      required: airdrop.criteria.minBridgeTransactions || 1,
      current: totalBridgeTransactions,
      met,
      description: `Need to use bridge at least ${
        airdrop.criteria.minBridgeTransactions || 1
      } time(s)`,
    });
    if (!met) allMet = false;
  }

  // Determine status
  let status: 'ok' | 'warning' | 'incomplete';
  let message: string;

  if (allMet) {
    status = 'ok';
    message = 'All requirements met!';
  } else {
    const unmetCount = requirements.filter((r) => !r.met).length;
    if (unmetCount <= 2) {
      status = 'warning';
      message = `Almost there! ${unmetCount} requirement(s) remaining`;
    } else {
      status = 'incomplete';
      message = `${unmetCount} requirements need attention`;
    }
  }

  return {
    airdropId: airdrop.id,
    airdropName: airdrop.name,
    status,
    message,
    requirements,
    totalStats: {
      totalTransactions,
      totalVolumeUSD: Math.round(totalVolumeUSD),
      activeDays: maxActiveDays,
      activeWeeks: maxActiveWeeks,
      totalContractInteractions,
      bridgeTransactions: totalBridgeTransactions,
    },
    networkStats,
  };
}
