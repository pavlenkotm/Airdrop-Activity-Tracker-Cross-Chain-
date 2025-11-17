import { RequirementStatus } from '@/types';

interface RequirementRowProps {
  requirement: RequirementStatus;
}

export default function RequirementRow({ requirement }: RequirementRowProps) {
  const percentage =
    typeof requirement.required === 'number' && typeof requirement.current === 'number'
      ? Math.min(100, (requirement.current / requirement.required) * 100)
      : requirement.met
      ? 100
      : 0;

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {requirement.met ? (
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div>
            <p className="font-medium text-gray-900">{requirement.name}</p>
            <p className="text-sm text-gray-500">{requirement.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">
            {typeof requirement.current === 'boolean'
              ? requirement.current
                ? 'Yes'
                : 'No'
              : requirement.current.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            of{' '}
            {typeof requirement.required === 'boolean'
              ? 'Required'
              : requirement.required.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            requirement.met ? 'bg-green-500' : 'bg-yellow-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
