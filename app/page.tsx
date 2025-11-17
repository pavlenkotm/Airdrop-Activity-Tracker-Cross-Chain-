'use client';

import { useState } from 'react';
import WalletInput from '@/components/WalletInput';
import AirdropCard from '@/components/AirdropCard';
import NetworkStats from '@/components/NetworkStats';
import { CheckActivityResponse } from '@/types';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckActivityResponse | null>(null);
  const [error, setError] = useState('');

  const handleCheckActivity = async (address: string) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/check-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check activity');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Airdrop Activity Tracker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check your wallet activity across multiple chains to see if you meet
            the criteria for potential airdrops from LayerZero, zkSync, Linea,
            Base, and Berachain.
          </p>
        </div>

        {/* Wallet Input */}
        <div className="mb-12">
          <WalletInput onSubmit={handleCheckActivity} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            <p className="mt-4 text-gray-600">
              Scanning blockchain activity across multiple networks...
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-8">
            {/* Wallet Info */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Wallet Address
              </h2>
              <p className="text-gray-600 font-mono break-all">
                {result.address}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Last checked:{' '}
                {new Date(result.lastChecked).toLocaleString()}
              </p>
            </div>

            {/* Network Stats */}
            <NetworkStats stats={result.totalStats} />

            {/* Airdrop Cards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Airdrop Eligibility
              </h2>
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {result.airdrops.map((airdrop) => (
                  <AirdropCard key={airdrop.airdropId} airdrop={airdrop} />
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Disclaimer:</strong> This tool provides an estimate
                based on publicly available on-chain data. Actual airdrop
                eligibility may vary and is determined by the respective
                projects. This is not financial advice.
              </p>
            </div>
          </div>
        )}

        {/* Info Cards (shown when no results) */}
        {!result && !loading && (
          <div className="grid gap-6 md:grid-cols-3 mt-12">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Multi-Chain Support
              </h3>
              <p className="text-sm text-gray-600">
                Track activity across Ethereum, Arbitrum, Optimism, Base, and
                zkSync Era
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Real-time Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Get instant insights on transactions, volume, and contract
                interactions
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Airdrop Ready
              </h3>
              <p className="text-sm text-gray-600">
                Check eligibility for LayerZero, zkSync, Linea, Base, and
                Berachain
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
