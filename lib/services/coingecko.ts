import axios from 'axios';
import { PriceData } from '@/types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Cache prices for 5 minutes
const priceCache = new Map<string, { data: PriceData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCurrentPrices(
  coinIds: string[]
): Promise<PriceData> {
  const cacheKey = coinIds.sort().join(',');
  const cached = priceCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await axios.get(
      `${COINGECKO_API_BASE}/simple/price`,
      {
        params: {
          ids: coinIds.join(','),
          vs_currencies: 'usd',
        },
      }
    );

    const priceData = response.data as PriceData;
    priceCache.set(cacheKey, { data: priceData, timestamp: Date.now() });

    return priceData;
  } catch (error) {
    console.error('Error fetching prices from CoinGecko:', error);
    // Return cached data even if expired, or empty object
    return cached?.data || {};
  }
}

export async function getEthereumPrice(): Promise<number> {
  const prices = await getCurrentPrices(['ethereum']);
  return prices.ethereum?.usd || 0;
}

export function calculateVolumeUSD(
  ethAmount: number,
  ethPrice: number
): number {
  return ethAmount * ethPrice;
}
