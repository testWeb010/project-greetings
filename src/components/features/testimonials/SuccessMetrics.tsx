
import React from 'react';

interface SuccessMetric {
  metric: string;
  label: string;
  icon: React.ElementType;
}

interface SuccessMetricsProps {
  metrics: SuccessMetric[];
}

const SuccessMetrics: React.FC<SuccessMetricsProps> = ({
  metrics
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {metrics.map((metric, index) => (
        <div key={index} className="group">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <metric.icon className="h-7 w-7 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {metric.metric}
            </div>
            <div className="text-gray-600 text-sm font-medium">
              {metric.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuccessMetrics;
