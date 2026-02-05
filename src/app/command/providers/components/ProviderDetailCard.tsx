interface ProviderDetailCardProps {
  name: string;
  successRate: number;
  failures: number;
  lastFailure: string | null;
}

export function ProviderDetailCard({ name, successRate, failures, lastFailure }: ProviderDetailCardProps) {
  const getStatusColor = () => {
    if (successRate >= 95) return 'border-green-500';
    if (successRate >= 80) return 'border-yellow-500';
    return 'border-red-500';
  };

  const getStatusBg = () => {
    if (successRate >= 95) return 'bg-green-50';
    if (successRate >= 80) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">{name}</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className={`text-xl font-bold ${
                successRate >= 95 ? 'text-green-600' : 
                successRate >= 80 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {successRate}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Failures</p>
              <p className="text-xl font-bold text-gray-900">{failures}</p>
            </div>
          </div>
          {lastFailure && (
            <div className="mt-3 p-3 bg-red-50 rounded-md">
              <p className="text-sm text-red-700">
                <span className="font-semibold">Last Failure:</span>{' '}
                {new Date(lastFailure).toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <div className={`ml-6 px-4 py-2 rounded-full ${getStatusBg()}`}>
          <span className="text-2xl">
            {successRate >= 95 ? '✅' : successRate >= 80 ? '⚠️' : '❌'}
          </span>
        </div>
      </div>
    </div>
  );
}
