interface ProviderTileProps {
  name: string;
  successRate: number;
  failures: number;
  lastFailure: string | null;
}

export function ProviderTile({ name, successRate, failures, lastFailure }: ProviderTileProps) {
  const getStatusColor = () => {
    if (successRate >= 95) return 'bg-green-100 border-green-500';
    if (successRate >= 80) return 'bg-yellow-100 border-yellow-500';
    return 'bg-red-100 border-red-500';
  };

  const getStatusIcon = () => {
    if (successRate >= 95) return '✅';
    if (successRate >= 80) return '⚠️';
    return '❌';
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize">{name}</h3>
          <p className="text-sm text-gray-500">
            {failures} failure{failures !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl">{getStatusIcon()}</div>
          <div className={`text-lg font-bold ${
            successRate >= 95 ? 'text-green-600' : 
            successRate >= 80 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {successRate}%
          </div>
        </div>
      </div>
      {lastFailure && (
        <p className="mt-2 text-xs text-gray-500">
          Last failure: {new Date(lastFailure).toLocaleString()}
        </p>
      )}
    </div>
  );
}
