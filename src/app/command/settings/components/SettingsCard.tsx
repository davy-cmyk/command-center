interface SettingsCardProps {
  name: string;
  value: string;
  description: string;
  status?: 'success' | 'error' | 'warning';
}

export function SettingsCard({ name, value, description, status }: SettingsCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'border-green-500 bg-green-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getValueStyles = () => {
    switch (status) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      case 'warning':
        return 'text-yellow-700';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className={`rounded-lg shadow p-6 border-l-4 ${getStatusStyles()}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{name}</h3>
          <p className={`mt-1 text-lg font-semibold ${getValueStyles()}`}>
            {value}
          </p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
