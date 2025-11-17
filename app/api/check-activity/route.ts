import { NextRequest, NextResponse } from 'next/server';
import { isValidAddress } from '@/lib/blockchain/provider';
import { checkAirdropEligibility } from '@/lib/services/activityChecker';
import { CheckActivityResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    if (!isValidAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid Ethereum address' },
        { status: 400 }
      );
    }

    // Check airdrop eligibility
    const airdrops = await checkAirdropEligibility(address);

    // Aggregate all network stats
    const allNetworkStats = airdrops.flatMap((airdrop) => airdrop.networkStats);

    const response: CheckActivityResponse = {
      address,
      airdrops,
      totalStats: allNetworkStats,
      lastChecked: Date.now(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error checking activity:', error);
    return NextResponse.json(
      { error: 'Failed to check activity. Please try again.' },
      { status: 500 }
    );
  }
}
