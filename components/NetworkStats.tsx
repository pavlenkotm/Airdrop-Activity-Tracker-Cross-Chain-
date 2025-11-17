import { ActivityStats } from '@/types';
import { NETWORK_CONFIGS } from '@/config/networks';

interface NetworkStatsProps {
  stats: ActivityStats[];
}

export default function NetworkStats({ stats }: NetworkStatsProps) {
  if (stats.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Network Activity Breakdown
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Network
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Transactions
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Volume (USD)
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Active Days
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Bridges
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => {
              const networkConfig = NETWORK_CONFIGS[stat.network];
              return (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                      <span className="font-medium text-gray-900">
                        {networkConfig.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {stat.totalTransactions.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    ${stat.totalVolumeUSD.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {stat.activeDays}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {stat.bridgeTransactions}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
