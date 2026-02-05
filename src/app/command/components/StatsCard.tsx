interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  warning?: boolean;
}

export function StatsCard({ title, value, icon, warning }: StatsCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${
      warning ? 'border-red-500' : 'border-blue-500'
    }`}>
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${warning ? 'text-red-600' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
