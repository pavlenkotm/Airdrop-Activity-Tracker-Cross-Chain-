import { AirdropStatus } from '@/types';
import StatusBadge from './StatusBadge';
import RequirementRow from './RequirementRow';

interface AirdropCardProps {
  airdrop: AirdropStatus;
}

export default function AirdropCard({ airdrop }: AirdropCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {airdrop.airdropName}
            </h3>
            <p className="text-sm text-gray-500">ID: {airdrop.airdropId}</p>
          </div>
          <StatusBadge status={airdrop.status} message={airdrop.message} />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500 mb-1">Transactions</p>
            <p className="text-lg font-semibold text-gray-900">
              {airdrop.totalStats.totalTransactions.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Volume</p>
            <p className="text-lg font-semibold text-gray-900">
              ${airdrop.totalStats.totalVolumeUSD.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Active Days</p>
            <p className="text-lg font-semibold text-gray-900">
              {airdrop.totalStats.activeDays}
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-1">
          <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
          {airdrop.requirements.map((req, index) => (
            <RequirementRow key={index} requirement={req} />
          ))}
        </div>
      </div>
    </div>
  );
}
