import { AirdropCriteria } from '@/types';
import layerzero from './layerzero.json';
import zksync from './zksync.json';
import linea from './linea.json';
import base from './base.json';
import berachain from './berachain.json';

export const AIRDROP_CONFIGS: AirdropCriteria[] = [
  layerzero as AirdropCriteria,
  zksync as AirdropCriteria,
  linea as AirdropCriteria,
  base as AirdropCriteria,
  berachain as AirdropCriteria,
];

export function getAirdropConfig(id: string): AirdropCriteria | undefined {
  return AIRDROP_CONFIGS.find((config) => config.id === id);
}

export function getAllAirdropConfigs(): AirdropCriteria[] {
  return AIRDROP_CONFIGS;
}
