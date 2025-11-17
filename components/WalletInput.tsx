'use client';

import { useState } from 'react';
import { isValidAddress } from '@/lib/blockchain/provider';

interface WalletInputProps {
  onSubmit: (address: string) => void;
  loading?: boolean;
}

export default function WalletInput({ onSubmit, loading }: WalletInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!address.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    if (!isValidAddress(address)) {
      setError('Invalid Ethereum address');
      return;
    }

    onSubmit(address);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="wallet"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Wallet Address
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="wallet"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Checking...
                </span>
              ) : (
                'Check Activity'
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}
