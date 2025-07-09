
import React from 'react';
import { Shield, Phone } from 'lucide-react';

interface TrustIndicator {
  id: string;
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface TrustIndicatorsProps {
  indicators?: TrustIndicator[];
}

const TrustIndicators: React.FC<TrustIndicatorsProps> = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Verified Properties</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,234</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Direct Owner Contact</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">95%</p>
          </div>
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">45,678</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
